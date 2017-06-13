import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Game } from '../ts/Game'
import { Observable, Subscription } from 'rxjs/Rx'

@Injectable()
export class GameService implements OnInit, OnDestroy {
  game: Game;
  saveTimer: Subscription;

  constructor() {
    this.game = new Game();
    this.saveTimer = Observable.timer(0, 60000).subscribe((t: number) => { this.saveTick(t) });
  }

  saveTick(value: number) {
    console.log('Saved.');
    this.game.saveNow();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
      this.saveTimer.unsubscribe();
  }
}
