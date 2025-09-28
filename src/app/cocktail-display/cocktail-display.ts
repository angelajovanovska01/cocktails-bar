import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CocktailService } from '../cocktail';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cocktail-display',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cocktail-display.html',
  styleUrls: ['./cocktail-display.css'],
})
export class CocktailDisplay implements OnInit {
  cocktails: any[] = [];
  searchLetter: string = '';

  constructor(
    private cocktailService: CocktailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments.map((segment) => segment.path).join('/');
      if (path.includes('random-cocktail')) {
        this.getRandomCocktail();
      } else if (path.includes('all')) {
        this.cocktailService
          .listCocktailsByFirstLetter('a')
          .subscribe((data: any) => {
            this.cocktails = data.drinks;
          });
      }
    });
  }

  getRandomCocktail(): void {
    this.cocktailService.getRandomCocktail().subscribe((data: any) => {
      this.cocktails = data.drinks;
    });
  }

  searchCocktails(): void {
    if (this.searchLetter) {
      this.cocktailService
        .listCocktailsByFirstLetter(this.searchLetter)
        .subscribe((data: any) => {
          this.cocktails = data.drinks;
        });
    }
  }
}
