import { Character, ActionCheckScore } from './Character'
import { Enemy } from './Enemy'
import { Dice } from './Dice'

class Map {
  width: number;
  height: number
  locations: {};

  constructor() {
    this.width = 10;
    this.height = 10;
    this.locations = {};
  }
}

class RoundEntry {
  score = 0;
  character: Character | null = null;
  enemy: Enemy | null = null;
  acted = false;

  static forCharacter(score: number, character: Character) {
    const re = new RoundEntry();
    re.score = score;
    re.character = character;
    return re;
  }
  static forEnemy(score: number, enemy: Enemy) {
    const re = new RoundEntry();
    re.score = score;
    re.enemy = enemy;
    return re;
  }
}

class Round {
  amazing: RoundEntry[];
  good: RoundEntry[];
  ordinary: RoundEntry[];
  marginal: RoundEntry[];

  constructor() {
    this.amazing = [];
    this.good = [];
    this.ordinary = [];
    this.marginal = [];
  }
}

export class Combat {
  characters: Character[];
  enemies: Enemy[];
  round: Round;
  currentCombatant: RoundEntry | null; // FIXME: what am i?
  // awarenessMap: Combat.newMap(),
  // visibilityMap: Combat.newMap()
  finished: boolean;

  static newMap() {
    return new Map();
  }

  static getAt(map: Map, height: number, width: number) {
    // Todo: assert max
    return map.locations[height * map.width + width];
  }

  static newCombat(characters: Character[]) {
    const nc = new Combat();
    nc.characters = characters;
    nc.enemies = [];
    nc.round = new Round(); // FIXME: not necessary?
    nc.currentCombatant = null; // FIXME: not necessary?
    nc.finished = true;

    nc.enemies.push(Enemy.newEnemy());
    return nc;
  }

  static fight(combat: Combat) {

  }

  static makeActionCheck(actionCheckScore: ActionCheckScore) {
    let roll = Dice.d20();
    if (actionCheckScore.base.step !== 0) {
      roll += Dice.roll(actionCheckScore.base.die)
    }

    return roll;
  }

  static newCombatRound(combat: Combat) {
    // if there's no one to fight we shouldn't even be here.
    if (combat.characters.length < 1) {
      return;
    }

    const round = new Round();

    combat.characters.forEach((c) => {
      const roll = Combat.makeActionCheck(c.actionCheckScore);

      if (roll <= c.actionCheckScore.amazing.score) {
        round.amazing.push(RoundEntry.forCharacter(roll, c));
      } else if (roll <= c.actionCheckScore.good.score) {
        round.good.push(RoundEntry.forCharacter(roll, c));
      } else if (roll <= c.actionCheckScore.ordinary.score) {
        round.ordinary.push(RoundEntry.forCharacter(roll, c));
      } else {
        round.marginal.push(RoundEntry.forCharacter(roll, c));
      }
    });

    console.log(JSON.stringify(combat.enemies));
    combat.enemies.forEach((e) => {
      // var roll = makeActionCheck(c.actionCheckScore);

      // TODO: shall we do proper action checks for monsters?
      switch (e.reaction.phase) {
        case 'amazing':
          round.amazing.push(RoundEntry.forEnemy(99, e));
          break;
        case 'good':
          round.good.push(RoundEntry.forEnemy(99, e));
          break;
        case 'ordinary':
          round.ordinary.push(RoundEntry.forEnemy(99, e));
          break;
        case 'marginal':
          round.marginal.push(RoundEntry.forEnemy(99, e));
          break;
      }
    });

    round.amazing.sort((a, b) => a.score - b.score);
    round.good.sort((a, b) => a.score - b.score);
    round.ordinary.sort((a, b) => a.score - b.score);
    round.marginal.sort((a, b) => a.score - b.score);

    combat.round = round;
    combat.finished = false;

    Combat.nextCombatant(combat);
  }

  static nextCombatant(combat: Combat) {
    console.log('next');

    // escape if we're done here.
    if (combat.finished) {
      return
    }

    combat.currentCombatant = null;

    combat.round.amazing.forEach(function(a) {
      if (combat.currentCombatant === null) {
        if (a.acted === false) {
          combat.currentCombatant = a;
        }
      }
    });
    combat.round.good.forEach(function(a) {
      if (combat.currentCombatant === null) {
        if (a.acted === false) {
          combat.currentCombatant = a;
        }
      }
    });
    combat.round.ordinary.forEach(function(a) {
      if (combat.currentCombatant === null) {
        if (a.acted === false) {
          combat.currentCombatant = a;
        }
      }
    });
    combat.round.marginal.forEach(function(a) {
      if (combat.currentCombatant === null) {
        if (a.acted === false) {
          combat.currentCombatant = a;
        }
      }
    });

    // if we're here, no-one else can act so new round?
    if (!combat.finished && combat.currentCombatant === null) {
      Combat.newCombatRound(combat)
    }
  }

  constructor() {
    this.characters = [];
    this.enemies = [];
    this.round = new Round();
    this.currentCombatant = null;
  }
}
