import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Recipe[], query: string): Recipe[] {
    return value.filter(recipe => recipe.name.toLowerCase().includes(query.toLowerCase()));
  }
}
