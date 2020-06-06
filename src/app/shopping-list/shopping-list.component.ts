import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientsService } from '../shared/ingredients.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    this.ingredients = this.ingredientsService.getIngredients();
    this.ingredientsService.ingredientsChanged.subscribe(
      ingredients => this.ingredients = ingredients
    );
  }
}
