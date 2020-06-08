import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { IngredientsService } from './ingredients.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {

  recipes: Recipe[] = [
    new Recipe('Pasta', 'Description', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
      [new Ingredient('Spaghetti', 200)]),
    new Recipe('Pizza', 'Description', 'https://recipes.timesofindia.com/thumb/56933159.cms?width=1200&height=1200',
      [new Ingredient('Tomatoes', 2), new Ingredient('Meat', 1), new Ingredient('Cheese', 2)])
  ];
  recipesChanges = new Subject<Recipe[]>();

  constructor(private ingredientsService: IngredientsService) {
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanges.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach(
      ingredient => this.ingredientsService.addIngredient(ingredient)
    );
  }
}
