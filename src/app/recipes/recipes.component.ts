import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  recipeSelectedSubscription: Subscription;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipeSelectedSubscription = this.recipesService.selectedRecipe.subscribe(
      recipe => this.selectedRecipe = recipe
    );
  }

  ngOnDestroy(): void {
    this.recipeSelectedSubscription.unsubscribe();
  }
}
