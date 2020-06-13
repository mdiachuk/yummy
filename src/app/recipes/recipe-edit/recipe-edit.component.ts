import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../shared/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  form: FormGroup;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params.id;
        this.editMode = params.id !== undefined;
        this.initFormContent();
      }
    );
  }

  private initFormContent() {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      recipe.ingredients.forEach(
        ingredient => ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name, [Validators.required]),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
        }))
      );
    }

    this.form = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, this.form.value);
    } else {
      this.recipesService.addRecipe(this.form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.form.reset();
    if (this.editMode) {
      this.router.navigate(['recipes', this.id]);
      this.editMode = false;
    } else {
      this.router.navigate(['recipes']);
    }
  }

  getIngredientControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).controls.splice(index, 1);
    this.form.get('ingredients').updateValueAndValidity();
  }
}
