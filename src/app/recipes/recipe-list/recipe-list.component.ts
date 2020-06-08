import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../shared/recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipesSubscription: Subscription;
  searchQuery: string;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.searchQuery = '';
    this.recipes = this.recipesService.getRecipes();
    this.recipesSubscription = this.recipesService.recipesChanges.subscribe(
      recipes => this.recipes = recipes
    );
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
