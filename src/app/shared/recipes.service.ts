import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { IngredientsService } from './ingredients.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {

  private recipes: Recipe[] = [];
  recipesChanges = new Subject<Recipe[]>();

  constructor(private ingredientsService: IngredientsService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes);
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
