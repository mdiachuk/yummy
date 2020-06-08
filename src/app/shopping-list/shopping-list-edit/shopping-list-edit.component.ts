import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IngredientsService } from '../../shared/ingredients.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') ingredientCreator: NgForm;
  selectedIndexSubscription: Subscription;
  editIndex: number;
  editMode: boolean;

  constructor(private ingredientsService: IngredientsService) {
  }

  ngOnInit(): void {
    this.selectedIndexSubscription = this.ingredientsService.selectedIngredientIndex.subscribe(
      index => {
        this.editIndex = index;
        this.editMode = true;
        const selectedIngredient = this.ingredientsService.getIngredient(index);
        this.ingredientCreator.setValue(selectedIngredient);
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedIndexSubscription.unsubscribe();
  }

  onSubmit() {
    const ingredient = this.ingredientCreator.value;
    if (this.editMode) {
      this.ingredientsService.updateIngredient(this.editIndex, ingredient);
    } else {
      this.ingredientsService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDelete() {
    this.ingredientsService.deleteIngredient(this.editIndex);
    this.onClear();
  }

  onClear() {
    this.ingredientCreator.reset();
    this.editMode = false;
  }
}
