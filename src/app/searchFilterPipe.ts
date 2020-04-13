import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})

// Search filter pipe that filters the country name
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.country.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}
