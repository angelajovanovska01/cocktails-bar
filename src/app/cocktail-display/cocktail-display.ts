import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../cocktail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-display.html'
})
export class CocktailDisplay implements OnInit {
  cocktails: any[] = [];

  constructor(private cocktailService: CocktailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path.includes('random-cocktail')) {
        this.getRandomCocktail();
      } else if (path.includes('all')) {
        this.cocktailService.listCocktailsByFirstLetter('a').subscribe((data: any) => {
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
}
