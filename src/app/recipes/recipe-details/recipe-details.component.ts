import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../../shared/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html'
})
export class RecipeDetailsComponent implements OnInit {

  id: number;
  recipe: Recipe;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params.id;
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
