import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../ts/Character'
import { GameService } from '../game.service'

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  characters: Character[];

  constructor(private router: Router, private gameService: GameService) {
    if (gameService.game.party != null) {
      this.characters = gameService.game.party.characters;
    }
  }

  ngOnInit() {
  }

}
