import { Pipe, PipeTransform } from '@angular/core';
import traverse from 'traverse';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, keys: string, query: string) {
    if (!query)
      return value;

    return (value || []).filter(item => {
      return keys
        .split(',')
        .some(
          key =>
            item.hasOwnProperty(key) && new RegExp(query, 'gi').test(item[key])
        )
    }
    );
  }
}
