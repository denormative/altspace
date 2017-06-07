import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toClass'
})
export class ToClassPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'Stun':
        return 'text-info';
      case 'Wound':
        return 'text-warning';
      case 'Mortal':
        return 'text-danger';
      case 'Fatigue':
        return 'text-muted';
      default:
        return '';
    }
  }
}
