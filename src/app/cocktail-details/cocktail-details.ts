import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../cocktail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details.html',
  styleUrl: './cocktail-details.css'
})
export class CocktailDetails implements OnInit {
  cocktail: any;

  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cocktailService.getCocktailById(id).subscribe((data: any) => {
        this.cocktail = data.drinks[0];
      });
    }
  }

  getIngredients(cocktail: any): { name: string, measure: string }[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail['strIngredient' + i];
      const measure = cocktail['strMeasure' + i];
      if (ingredient) {
        ingredients.push({ name: ingredient, measure: measure });
      }
    }
    return ingredients;
  }
}
