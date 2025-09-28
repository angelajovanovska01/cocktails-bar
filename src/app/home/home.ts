import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from '../cocktail.model';
import { CocktailFacade } from '../cocktail.facade';
import { CommonModule } from '@angular/common';
import { CocktailDisplay } from '../cocktail-display/cocktail-display';
import { MoodMixologist } from '../mood-mixologist/mood-mixologist';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CocktailDisplay, MoodMixologist, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  cocktails$: Observable<Cocktail[]>;
  loading$: Observable<boolean>;

  constructor(private cocktailFacade: CocktailFacade) {
    this.cocktails$ = this.cocktailFacade.cocktails;
    this.loading$ = this.cocktailFacade.loading;
  }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    this.cocktailFacade.loadCocktails(10);
  }
}
