import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataService } from '../shared/data.service';
import { Injectable } from '@angular/core';
import { RecipesService } from '../shared/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipesService: RecipesService, private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataService.getAll();
    } else {
      return recipes;
    }
  }
}
