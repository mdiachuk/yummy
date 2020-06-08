import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { IngredientsService } from './ingredients.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {

  recipes: Recipe[] = [
    new Recipe('Pasta', 'In large bowl, dissolve yeast and sugar in water; let stand for 5 minutes. Add oil and salt. Stir in flour, a cup at a time, until a soft dough forms.\n' +
      'Turn onto floured surface; knead until smooth and elastic, about 2-3 minutes. Place in a greased bowl, turning once to grease the top. Cover and let rise in a warm place until doubled, about 45 minutes. ' +
      'Meanwhile, cook beef and onion over medium heat until no longer pink; drain.\n' +
      'Punch down dough; divide in half. Press each into a greased 12-in. pizza pan. Combine the tomato sauce, oregano and basil; spread over each crust. Top with beef mixture, green pepper and cheese.\n' +
      'Bake at 400° for 25-30 minutes or until crust is lightly browned.', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
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
