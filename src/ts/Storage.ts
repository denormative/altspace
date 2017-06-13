// https://github.com/particle-clicker/particle-clicker/blob/master/js/storage.js
/** Allows to save objects to HTML5 local storage.
 * However, it can only save properties, not functions.
 */
export class Storage {
  static _s = localStorage;
  static save(key: string, item: any) {
      Storage._s.setItem(key, JSON.stringify(item, (key2, val) => {
          if (key2 === '$$hashKey') {
              return undefined;
          }
          return val;
      }));
  }

  static load(key: string) {
    const item = Storage._s.getItem(key)
    if (item !== 'undefined' && item != null) {
      return JSON.parse(item);
    }
  }

  static clear() {
      Storage._s.clear();
  }
}
