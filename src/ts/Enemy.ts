import { OGA, Damage, Range, DamageType } from './Character';

export class EnemyAttackForm {
  name: string;
  score: OGA;
  type: DamageType;
  range: Range;
  damage: Damage;

  constructor(
    name: string = '', score: OGA = new OGA(), range: Range = new Range(),
    type: DamageType = new DamageType(), damage: Damage = new Damage()
  ) {
    this.name = name;
    this.score = score;
    this.type = type;
    this.range = range;
    this.damage = damage;
  }
}


export class Enemy {
  name: string;
  str: { die: string, value: number };
  dex: { die: string, value: number };
  con: { die: string, value: number };
  int: { die: string, value: number, animal: number };
  wil: { die: string, value: number };
  per: { die: string, value: number, animal: number };
  durability: {
    stun: number,
    wound: number,
    mortal: number,
    fatigue: number,
  };
  actionCheck: {
    marginal: number,
    ordinary: number,
    good: number,
    amazing: number,
  };
  move: {
    run: number,
    walk: number,
    swim: number,
    fly?: number,
  };
  actionsPerRound: number;
  reaction: { phase: string, score: number };
  attacks: EnemyAttackForm[];
  resistance: {
    melee: number,
    range: number,
  };
  armor: {
    li: string,
    hi: string,
    en: string,
  };
  skills: {};
  attack: () => void;

  static newEnemy() {
    const ne = new Enemy();

    ne.name = 'Amphibian';
    ne.str = {value: 15, die: 'd4+12' };
    ne.dex = {value: 8, die: 'd4+5' };
    ne.con = {value: 17, die: 'd4+15' };
    ne.int = {value: 1, die: 'd4+2', animal: 4 };
    ne.wil = {value: 8, die: 'd4+5' };
    ne.per = {value: 1, die: 'd4+2', animal: 4 };
    ne.durability = {stun: 17, wound: 17, mortal: 9, fatigue: 9 };
    ne.actionCheck = {marginal: 9, ordinary: 8, good: 4, amazing: 2 };
    ne.move = { run: 20, walk: 4, swim: 20 };
    ne.actionsPerRound = 2;
    ne.reaction = { phase: 'marginal', score: 1 };
    ne.attacks.push(new EnemyAttackForm('Tongue',
      new OGA(8), new Range(6, 0, 0),
      new DamageType('LI', 'O'),
      new Damage('d4s', 'd4+1s', 'd4+2s')
    ));
    ne.attacks.push(new EnemyAttackForm('Bite',
      new OGA(13), Range.newPersonal(),
      new DamageType('LI', 'O'),
      new Damage('d4+2w', 'd6+3w', 'd4m')
    ));
    ne.resistance =  { melee: +2, range: 0 };
    ne.armor = { li: 'd4', hi: 'd4-2', en: 'd4-1' };
    // TODO: needs skills and attack function
    ne.attack = function () {
      // if were already engaged with a target
      if (this.engagedWith !== undefined) {
        // if distance to target is personal range, attack with personal range attack
        // else if target still visible
          // if target in range of one ranged attack
            // use attack
          // else try to move into range and attack
          // else guard
        // else try to move into range and attack
        // else guard

      }
      else {
        // find all visible targets
        // if in melee range with melee attack, attack with melee
        // if in range of range attack, attack closest
        // if can get in range if range attack, do so
        // if can get in range of melee attack, do so
        // if can't get in range of either, move closer and guard
      }
    };

    return ne;
  }

  constructor() {
    this.name = '';
    this.str = { die: '', value: 0 };
    this.dex = { die: '', value: 0 };
    this.con = { die: '', value: 0 };
    this.int = { die: '', value: 0, animal: 0 };
    this.wil = { die: '', value: 0 };
    this.per = { die: '', value: 0, animal: 0 };
    this.durability = {
      stun: 0,
      wound: 0,
      mortal: 0,
      fatigue: 0,
    },
    this.actionCheck = {
      marginal: 0,
      ordinary: 0,
      good: 0,
      amazing: 0
    };
    this.move = {
      run: 0,
      walk: 0,
      swim: 0,
      fly: 0
    };
    this.actionsPerRound = 0;
    this.reaction = { phase: '', score: 0 };
    this.attacks = []/*{
      name: "",
      score: {ordinary: null, good: null, amazing: null},
      range: {short: 0, medium: 0, long: 0, personal: false},
      type: {form:"", firepower: ""},
      damage: {ordinary: "", good: "", amazing: ""}
    }*/;
    this.resistance = {
      melee: 0,
      range: 0,
    };
    this.armor = {
      li: '',
      hi: '',
      en: '',
    };
    this.skills = {};
    this.attack = () => false; /* function */
  }
}
