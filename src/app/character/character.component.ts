import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../ts/Character'
import { GameService } from '../game.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  menu = {
    combat: true,
    party: true,
    characters: true,
  };
  character: Character;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const id: number = params['id'];
      const party = this.gameService.game.party;
      if (party != null && party.characters.length > id ) {
        this.character = party.characters[id];
      }
    })
  }
}
