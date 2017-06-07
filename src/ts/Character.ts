import { Dice } from './Dice';
import { Chance } from 'chance';
import { sprintf } from 'sprintf-js'
import { careerList } from './data/careerList'
import { professionList } from './data/professionList'
import { speciesList } from './data/speciesList'

const chance = new Chance()

export class Career {
  name: string;
  profession: string;
};

export class Profession {
  name: string;
  specialBenefits: {
    actionCheckScoreIncrease: number
  };
};

export class Species {
  name: string;
  specialAbilities: {
    baseActionCheckStep: number
  };
};

class DurabilityLevel {
  name: string;
  sName: string;
  ssName: string;
  score: number;
  max: number;
  constructor(name: string, sName: string, ssName: string, score: number = 0) {
    this.name = name;
    this.sName = sName;
    this.sName = ssName;
    this.max = this.score = score;
  }
}
export class Durability {
  stun: DurabilityLevel;
  wound: DurabilityLevel;
  mortal: DurabilityLevel;
  fatigue: DurabilityLevel;

  constructor(con: number = 0) {
    const halfCon = Math.ceil(con / 2);

    this.stun = new DurabilityLevel('Stun', 'STN', 'S', con);
    this.wound = new DurabilityLevel('Wound', 'WND', 'W', con);
    this.mortal = new DurabilityLevel('Mortal', 'MOR', 'M', halfCon);
    this.fatigue = new DurabilityLevel('Fatigue', 'FTG', 'F', halfCon);
  }

  updateDurability(con: number) {
    const halfCon = Math.ceil(con / 2);
    // stun+wounds are equal to con
    this.stun.score = this.wound.score = con;
    this.stun.max = this.wound.max = con;
    // mortal+fatigue are equal to half of con rounded up
    this.mortal.score = this.fatigue.score = halfCon;
    this.mortal.max = this.fatigue.max = halfCon;

  }
}

export class Ability {
  name: string;
  sName: string;
  ssName: string;
  score: number;
  untrained: number;
  resMod: number;

  static resistanceModifier(abilityScore: number) {
    if (abilityScore <= 4) { return -2 };
    if (abilityScore <= 6) { return -1 };
    if (abilityScore <= 10) { return 0 };
    if (abilityScore <= 12) { return 1 };
    if (abilityScore <= 14) { return 2 };
    if (abilityScore <= 16) { return 3 };
    if (abilityScore <= 18) { return 4 };
    return 5;
  }

  constructor(name: string, sName: string, ssName: string) {
    this.name = name;
    this.sName = sName;
    this.ssName = ssName;
    this.score = 0;
    this.untrained = 0;
    this.resMod = 0;
  }

  setScore(score: number) {
    this.score = score;
    this.untrained = Math.floor(score / 2);
    this.resMod = Ability.resistanceModifier(score);
  }
}

export class Abilities {
  str: Ability;
  dex: Ability;
  con: Ability;
  int: Ability;
  wil: Ability;
  per: Ability;

  constructor() {
    this.str = new Ability('Strength', 'STR', 'S');
    this.dex = new Ability('Dexterity', 'DEX', 'D');
    this.con = new Ability('Constitution', 'CON', 'C');
    this.int = new Ability('Intelligence', 'INT', 'I');
    this.wil = new Ability('Will', 'WIL', 'W');
    this.per = new Ability('Personality', 'PER', 'P');
  }
};

export class OGA {
  ordinary: number;
  good: number;
  amazing: number;

  constructor(score = 0) {
    this.ordinary = score;
    this.good = Math.floor(score / 2);
    this.amazing = Math.floor(score / 4);
  }
}

export class Damage {
  ordinary: string;
  good: string;
  amazing: string;

  constructor(ordinary: string = '', good: string = '', amazing: string = '') {
    this.ordinary = ordinary;
    this.good = good;
    this.amazing = amazing;
  }
}

export class DamageType {
  form: string;
  firepower: string;

  constructor(form: string = '', firepower: string = '') {
    this.form = form;
    this.firepower = firepower;
  }
}

export class Range {
  short: number;
  medium: number;
  long: number;
  personal: boolean;

  static newPersonal() {
    return new Range(0, 0, 0, true);
  }

  constructor(short: number = 0, medium: number = 0, long: number = 0, personal: boolean = false) {
    this.short = short;
    this.medium = medium;
    this.long = long;
    this.personal = personal;
  }
}

// type Score = OGA; // TODO: Alias score type

export class AttackForm {
  name: string;
  score: OGA;
  baseDice: {
    step: number,
    die: string,
  };
  type: {
    form: string,
    firepower: string,
  };
  range: Range;
  damage: Damage;

  constructor() {
    this.name = '';
    this.score = new OGA();
    this.baseDice = { step: 0, die: '' };
    this.type = { form: '', firepower: '' };
    this.range = new Range();
    this.damage = new Damage();
  }
}

class ActionCheckScoreRating {
  name: string;
  sName: string;
  score: number;
  constructor(name: string, sName: string) {
    this.name = name;
    this.sName = sName;
    this.score = 0;
  }
}

export class ActionCheckScore {
  marginal: ActionCheckScoreRating;
  ordinary: ActionCheckScoreRating;
  good: ActionCheckScoreRating;
  amazing: ActionCheckScoreRating;
  base: {step: number, die: string};
  actionsPerRound: number;

  constructor() {
    this.marginal = new ActionCheckScoreRating('Marginal', 'M');
    this.ordinary = new ActionCheckScoreRating('Ordinary', 'O');
    this.good = new ActionCheckScoreRating('Good', 'G');
    this.amazing = new ActionCheckScoreRating('Amazing', 'A');
    this.base = {step: 0, die: ''};
    this.actionsPerRound = 0;
  }
}

export class Character {

  name: {
    short: string;
    full: string;
  };
  abilities: Abilities;
  species: Species;
  profession: Profession;
  career: Career;
  durability: Durability;
  actionCheckScore: ActionCheckScore;
  attackForms: AttackForm[];

  static newAbilities(species: Species, profession: Profession) {
    const na = new Abilities();

    na.str.setScore(Dice.roll('2d6+2'));
    na.dex.setScore(Dice.roll('2d6+2'));
    na.con.setScore(Dice.roll('2d6+2'));
    na.int.setScore(Dice.roll('2d6+2'));
    na.wil.setScore(Dice.roll('2d6+2'));
    na.per.setScore(Dice.roll('2d6+2'));

    return na;
  }

  static toDiceString(dice: string, mod: number, type: string) {
    if (mod === 0) {
      return sprintf('%s%s', dice, type);
    }
    return sprintf('%s%+d%s', dice, mod, type);
  }

  static newUnarmedAttackForm(abilities: Abilities) {
    const naf = new AttackForm();

    naf.name = 'Unarmed';

    naf.score = new OGA(abilities.str.score);

    naf.baseDice.step = +1;
    naf.baseDice.die = Character.stepToDie(naf.baseDice.step);

    naf.type = {form: 'LI', firepower: 'O'};

    naf.range.personal = true;

    naf.damage.ordinary = Character.toDiceString('d4', abilities.str.resMod, 's');
    naf.damage.good = Character.toDiceString('d4', abilities.str.resMod + 1, 's');
    naf.damage.amazing = Character.toDiceString('d4', abilities.str.resMod + 2, 's');

    return naf;
  }

  static stepToDie(step: number): string {
    switch (step) {
      case -5: return '-d20';
      case -4: return '-d12';
      case -3: return '-d8';
      case -2: return '-d6';
      case -1: return '-d4';
      case  0: return '+d0';
      case  1: return '+d4';
      case  2: return '+d6';
      case  3: return '+d8';
      case  4: return '+d12';
      case  5: return '+d20';
      case  6: return '+2d20';
      case  7: return '+3d20';
    }
    return ''; // can't happen
  }

  static actionsPerRound(abilities: Abilities) {
    const apr = abilities.con.score + abilities.wil.score;

    if (apr <= 15) { return 1 };
    if (apr <= 23) { return 2 };
    if (apr <= 31) { return 3 };
    return 4;
  }

  static newActionCheckScore(abilities: Abilities, species: Species, profession: Profession) {
    const nac = new ActionCheckScore();

    const baseAC = Math.floor((abilities.dex.score + abilities.int.score) / 2)
      + profession.specialBenefits.actionCheckScoreIncrease;

    nac.marginal.score = baseAC + 1;
    nac.ordinary.score = baseAC;
    nac.good.score = Math.floor(baseAC / 2);
    nac.amazing.score = Math.floor(baseAC / 4);
    nac.base.step = species.specialAbilities.baseActionCheckStep;
    nac.base.die = Character.stepToDie(nac.base.step);
    nac.actionsPerRound = Character.actionsPerRound(abilities);

    return nac;
  }

  static newCharacter() {
    const nc = new Character();

    nc.name.short = chance.first();
    nc.name.full = nc.name.short + ' ' + chance.last();
    nc.career = chance.pick(careerList);
    // nc.profession = _.findWhere(Character.professionList, {name: nc.career.profession}); // chance.pick(professions);
    nc.profession = professionList.filter((i) => i.name === nc.career.profession)[0]
    nc.species = chance.pick(speciesList);
    nc.abilities = Character.newAbilities(nc.species, nc.profession);
    nc.durability = new Durability(nc.abilities.con.score);
    nc.actionCheckScore = Character.newActionCheckScore(nc.abilities, nc.species, nc.profession);
    nc.attackForms.push(Character.newUnarmedAttackForm(nc.abilities));

    // console.log(JSON.stringify(nc));
    return nc;
  }

  constructor() {
    this.name = { short: '', full: '' };
    this.abilities = new Abilities();
    this.species = new Species();
    this.profession = new Profession();
    this.career = new Career();
    this.durability = new Durability();
    this.actionCheckScore = new ActionCheckScore();
    this.attackForms = [];
  }
}
