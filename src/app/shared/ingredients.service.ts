import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Injectable()
export class IngredientsService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 5),
    new Ingredient('Apples', 7)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients);
  }
}
