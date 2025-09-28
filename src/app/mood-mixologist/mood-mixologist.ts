import { Component } from '@angular/core';
import { Cocktail } from '../cocktail.model';
import { CocktailService } from '../cocktail';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MoodSelectorComponent } from '../mood-selector/mood-selector';
import { CocktailDisplay } from '../cocktail-display/cocktail-display';

@Component({
  selector: 'app-mood-mixologist',
  standalone: true,
  imports: [CommonModule, MoodSelectorComponent, CocktailDisplay],
  templateUrl: './mood-mixologist.html',
  styleUrls: ['./mood-mixologist.css']
})
export class MoodMixologist {
  cocktails$: Observable<Cocktail[]> = of([]);
  isLoading = false;

  constructor(private cocktailService: CocktailService) {}

  onMoodSelected(mood: string) {
    this.isLoading = true;
    this.cocktails$ = this.cocktailService.getCocktailsForMood(mood);
    this.cocktails$.subscribe(() => this.isLoading = false);
  }
}