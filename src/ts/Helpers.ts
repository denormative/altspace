
import { Storage } from './Storage';

/** @module Helpers
 * Define some useful helpers that are used throughout the game.
 */
 export class Helpers {
   static saveVersion = '1.0';

  /** Format a number with proper postfix.
   */
  static formatNumberPostfix(number: number) {
    const prefixes = [
        {magnitude: 1e24, label: 'Y'},
        {magnitude: 1e21, label: 'Z'},
        {magnitude: 1e18, label: 'E'},
        {magnitude: 1e15, label: 'P'},
        {magnitude: 1e12, label: 'T'},
        {magnitude: 1e9, label: 'B'},
        {magnitude: 1e6, label: 'M'},
        {magnitude: 1e3, label: 'k'}
    ];

    const abs = Math.abs(number);
    for (let i = 0; i < prefixes.length; i++) {
        if (abs >= prefixes[i].magnitude) {
            return (number / prefixes[i].magnitude).toFixed(1) + prefixes[i].label;
        }
    }
    return number;
  }

  validateSaveVersion() {
      const ver = Storage.load('saveVersion');
      if (typeof ver === 'undefined' || ver !== Helpers.saveVersion) {
          Storage.clear();
          Storage.save('saveVersion', Helpers.saveVersion);
      }
  };
}
