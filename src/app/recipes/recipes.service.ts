import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientsService } from '../shared/ingredients.service';

@Injectable()
export class RecipesService {

  recipes: Recipe[] = [
    new Recipe('Pasta', 'Description', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
      [new Ingredient('Spaghetti', 200)]),
    new Recipe('Pizza', 'Description', 'https://recipes.timesofindia.com/thumb/56933159.cms?width=1200&height=1200',
      [new Ingredient('Tomatoes', 2), new Ingredient('Meat', 1), new Ingredient('Cheese', 2)])
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  constructor(private ingredientsService: IngredientsService) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach(
      ingredient => this.ingredientsService.addIngredient(ingredient)
    );
  }
}
