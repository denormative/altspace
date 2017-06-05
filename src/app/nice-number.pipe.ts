import { Pipe, PipeTransform } from '@angular/core';
import { Helpers } from '../assets/Helpers';

@Pipe({
  name: 'niceNumber'
})
export class NiceNumberPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return Helpers.formatNumberPostfix(value);
  }
}
