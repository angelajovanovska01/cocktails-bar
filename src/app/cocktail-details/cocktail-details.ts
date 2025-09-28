import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Cocktail } from '../cocktail.model';
import { CocktailFacade } from '../cocktail.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './cocktail-details.html',
  styleUrl: './cocktail-details.css'
})
export class CocktailDetails implements OnInit {
  cocktail$: Observable<Cocktail | null>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private cocktailFacade: CocktailFacade,
    private location: Location
  ) {
    this.cocktail$ = this.cocktailFacade.selectedCocktail;
    this.loading$ = this.cocktailFacade.loading;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cocktailFacade.loadCocktailById(id);
    }
  }

  getIngredients(cocktail: Cocktail): { name: string, measure: string }[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[('strIngredient' + i) as keyof Cocktail];
      const measure = cocktail[('strMeasure' + i) as keyof Cocktail];
      if (ingredient) {
        ingredients.push({ name: ingredient as string, measure: measure as string });
      }
    }
    return ingredients;
  }

  goBack(): void {
    this.location.back();
  }
}
