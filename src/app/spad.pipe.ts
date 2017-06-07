import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spad'
})
export class SpadPipe implements PipeTransform {

  transform(value: any, pad: number, args?: any): any {
    if (value === undefined) {
      value = '';
    }
    if (value.length >= pad) {
      return value;
    }
    const spaces = ' '.repeat(pad);

    return (spaces + value).slice(-1 * pad)
  }

}
