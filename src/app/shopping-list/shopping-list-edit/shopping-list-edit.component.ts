import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { IngredientsService } from '../../shared/ingredients.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const ingredient = new Ingredient(
      this.name.nativeElement.value,
      this.amount.nativeElement.value
    );
    this.ingredientsService.addIngredient(ingredient);
  }
}
