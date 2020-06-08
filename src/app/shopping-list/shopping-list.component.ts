import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientsService } from '../shared/ingredients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientChangesSubscription: Subscription;

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.getIngredients();
    this.ingredientChangesSubscription = this.ingredientsService.ingredientsChanged.subscribe(
      ingredients => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.ingredientChangesSubscription.unsubscribe();
  }

  onSelect(index: number) {
    this.ingredientsService.selectIngredient(index);
  }
}
