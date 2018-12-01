import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'featured'
})
export class FeaturedPipe implements PipeTransform {

  transform(values: any[]): any[] {
    if (!values)
      return;

    return values.filter(value => value.featured)
  }

}
