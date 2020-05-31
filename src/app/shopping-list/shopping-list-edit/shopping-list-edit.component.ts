import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput'  ) amount: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addIngredient.emit(new Ingredient(this.name.nativeElement.value,
      this.amount.nativeElement.value));
  }

}
