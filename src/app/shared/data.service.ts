import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://yummy-61e3e.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipesService: RecipesService) {
  }

  getAll() {
    return this.http.get<Recipe[]>(this.baseUrl)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
            return recipe;
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }

  saveAll() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe();
  }
}
