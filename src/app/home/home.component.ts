import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../../ts/Game'
import { Storage } from '../../ts/Storage'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public game: Game;

  constructor(private gameService: GameService) {
    this.game = gameService.game;
  }

  restart() {
    if (window.confirm('Do you really want to restart the game? All progress will be lost.')) {
      Storage.clear();
      window.location.reload(true);
    }
  }
}
