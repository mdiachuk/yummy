import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() selectRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Pasta', 'Description', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg'),
    new Recipe('Pizza', 'Description', 'https://recipes.timesofindia.com/thumb/56933159.cms?width=1200&height=1200')
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(recipe: Recipe) {
    this.selectRecipe.emit(recipe);
  }

}
