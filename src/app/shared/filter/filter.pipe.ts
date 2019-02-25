import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string): any[] {
    if (!value ) { return []; }
    if (!filterString) { return value; }

    console.log('hhh', value, filterString);
    // filterString = filterString.toLowerCase();
    value.filter(it => {
      return it.toLowerCase().includes(filterString);
    });
  }

}
