import { Injectable } from '@angular/core';
import { Game } from '../ts/Game'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class GameService {
  game: Game;

  constructor() {
    this.game = new Game();
    Observable.interval(1000).subscribe(this.game.saveNow)
  }
}
