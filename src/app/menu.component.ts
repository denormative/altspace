import { Component, Input, OnInit } from '@angular/core';
import { CombatActions } from '../ts/CombatActions'
import { Game } from '../ts/Game'
import { GameService } from './game.service';

@Component({
  selector: 'app-menu',
  template: `
    <nav class="navbar navbar-toggleable-xl navbar-inverse fixed-bottom bg-inverse">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li *ngIf="menu.savedTime" class="nav-item">
            <span class="navbar-text">Saved: {{ game.lastSaved | date:'H:mm' }}</span>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li *ngIf="menu.debugSkip" class="nav-item">
            <a class="nav-link" (click)="combatActions.debugSkip(game.combat)">Skip (Debug)</a>
          </li>
          <li *ngIf="menu.home" class="nav-item"><a class="nav-link" [routerLink]="['/']">Home</a></li>
          <li *ngIf="menu.combat" class="nav-item">
            <a class="nav-link" [routerLink]="['/combat/fight']"><i class="ra ra-crossed-swords"></i> Combat</a>
          </li>
          <li *ngIf="menu.party" class="nav-item">
            <a class="nav-link" [routerLink]="['/party/all']"><i class="fa fa-users"></i> Party</a>
          </li>
          <app-character-dropdown *ngIf="menu.characters"></app-character-dropdown>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class MenuComponent implements OnInit {
  @Input() menu: { [s: string]: boolean };
  // TODO: for debugSkip; remove when finished
  combatActions: CombatActions;
  game: Game;

  constructor(private gameService: GameService) {
    this.game = gameService.game;
    this.combatActions = CombatActions;
  }

  ngOnInit() {
  }

}
