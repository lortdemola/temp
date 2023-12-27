import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[]):any {
    return value.sort((a, b) => {
        return b.score - a.score;
      return 0;
    });
  }
}
