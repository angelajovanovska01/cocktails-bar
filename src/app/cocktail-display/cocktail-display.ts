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

  displayedCocktailsCount: number = 12; // Initially display 2 rows (6 columns * 2 rows)

  get displayedCocktails(): Cocktail[] {
    return this.cocktails.slice(0, this.displayedCocktailsCount);
  }

  loadMoreCocktails(): void {
    this.displayedCocktailsCount += 12; // Load 2 more rows
  }

  hasMoreCocktails(): boolean {
    return this.displayedCocktailsCount < this.cocktails.length;
  }
}
