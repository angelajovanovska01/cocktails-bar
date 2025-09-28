import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Cocktail } from '../cocktail.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cocktail-display',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cocktail-display.html',
  styleUrls: ['./cocktail-display.css'],
})
export class CocktailDisplay {
  @Input() cocktails!: Cocktail[];

  displayedCocktailsCount: number = 12; 

  get displayedCocktails(): Cocktail[] {
    return this.cocktails.slice(0, this.displayedCocktailsCount);
  }

  loadMoreCocktails(): void {
    this.displayedCocktailsCount += 12; 
  }

  hasMoreCocktails(): boolean {
    return this.displayedCocktailsCount < this.cocktails.length;
  }
}
