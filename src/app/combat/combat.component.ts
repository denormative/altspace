import { Component, OnInit } from '@angular/core';
import { CombatActions } from '../../ts/CombatActions'
import { Game } from '../../ts/Game'
import { GameService } from '../game.service';
import { Combat } from '../../ts/Combat'

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {
  menu = {
    party: true,
    characters: true,
    debugSkip: true,
  };
  game: Game;
  combatActions: CombatActions;

  constructor(private gameService: GameService) {
    this.game = gameService.game;
    this.combatActions = CombatActions;
  }

  ngOnInit() {
    // this.map = new ROT.Map.Arena(10, 10);
    // this.display1 = new ROT.Display({width: 10, height: 10, fontSize: 36, forceSquareRatio: true});
    // const c = this.display1.getContainer();
    // c.classList.add('center-block');
    // if (document != null) {
    //   const mapel = document.getElementById('combatMap')
    //   if (mapel != null) {
    //     mapel.appendChild(c);
    //   }
    // }

    // this.map.create(function (x: number, y: number, wall?: string) {
    //     this.display1.draw(x, y, wall ? '#' : ' ');
    // });
  }

  // $scope.combatActions = CombatActions;

  fnord() {
    console.log('fnord');
  }

  newCombat() {
    if (this.game.party != null) {
      this.game.combat = Combat.newCombat(this.game.party.characters);
      Combat.newCombatRound(this.game.combat);
    }
  }
}
