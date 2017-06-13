import { Party } from './Party';
import { Character } from './Character';
import { Storage } from './Storage';
import { Combat } from './Combat';

class Settings {
  key: string;
  state: string;
  time: number;
  saveVersion: 1;
  version: 1;

  constructor() {
    this.key = 'settings';
    this.state = '';
    this.time = 0;
    this.saveVersion = 1;
    this.version = 1;
  }
}

export class Game {
  settings: Settings;
  party: Party | null;
  combat?: Combat;
  loaded: boolean;
  lastSaved: number;

  newCombat() {
    return {
      key: 'combat'
    };
  }

  newParty() {
    const myParty: Party = {key: 'party', characters: []};

    myParty.characters.push(Character.newCharacter());
    myParty.characters.push(Character.newCharacter());
    myParty.characters.push(Character.newCharacter());
    myParty.characters.push(Character.newCharacter());
    myParty.characters.push(Character.newCharacter());
    myParty.characters.push(Character.newCharacter());

    return myParty;
  }

  constructor() {
    const s = Storage.load('settings');
    if (s === undefined) {
      this.settings = new Settings();
    }
    else {
      console.log('settings loaded...');
      this.settings = s;
    }

    this.lastSaved = new Date().getTime();

    const g = Storage.load('game');
    if (g === undefined) {
      this.resetGame();
    }
    else {
      console.log('game loaded...');
      this.party = g.party;
      this.combat = g.combat;
    }

    this.loaded = true;
  };

  newGame() {
    this.party = this.newParty();
    this.combat = new Combat(); // created in Combat
    this.save();
  };

  resetGame() {
    this.party = new Party();
    this.combat = new Combat();
    this.save();
  };

  save() {
    Storage.save('settings', this.settings);

    // Save every object's state to local storage
    const game = {
      // adventure: this.adventure,
      party: this.party,
      combat: this.combat
    };

    Storage.save('game', game);
  };

  saveNow() {
    const saveTime = new Date().getTime();
    this.settings.time += saveTime - this.lastSaved;
    this.save();
    this.lastSaved = saveTime;
  };
}
