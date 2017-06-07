import { Combat } from './Combat'

export class CombatActions {
  static debugSkip(combat: Combat) {
    console.log('skip');
    if (combat.currentCombatant !== null) {
      console.log(JSON.stringify(combat.currentCombatant.acted));
      combat.currentCombatant.acted = true;
      console.log(JSON.stringify(combat.currentCombatant.acted));
    }

    Combat.nextCombatant(combat);
  }
}
