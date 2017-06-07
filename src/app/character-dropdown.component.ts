import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service'
import { Character } from '../ts/Character'

@Component({
  selector: 'app-character-dropdown',
  template: `
    <li class="nav-item dropup">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown">
        <!-- TODO: work out how to put a proper "hand" icon when mousing over -->
        <i class="fa fa-user"></i> Character (<span ng-cloak>{{ characters.length }}</span>) <span class="caret"></span>
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" *ngFor="let character of characters; index as i" [routerLink]="['/party/character', i]">
          <i class="fa fa-user"></i> {{ character.name.full }}
        </a>
      </div>
    </li>
  `,
  styles: []
})
export class CharacterDropdownComponent implements OnInit {
  characters: Character[];

  constructor(private gameService: GameService) {
    if (gameService.game.party != null) {
      this.characters = gameService.game.party.characters;
    }
  }

  ngOnInit() {
  }

}
