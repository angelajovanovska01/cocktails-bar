import { Component } from '@angular/core';
import { Cocktail } from '../cocktail.model';
import { CocktailService } from '../cocktail';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MoodSelectorComponent } from '../mood-selector/mood-selector';
import { CocktailDisplay } from '../cocktail-display/cocktail-display';
import { moodMap } from '../mood-config'; // Import moodMap

@Component({
  selector: 'app-mood-mixologist',
  standalone: true,
  imports: [CommonModule, MoodSelectorComponent, CocktailDisplay],
  templateUrl: './mood-mixologist.html',
  styleUrls: ['./mood-mixologist.css'],
})
export class MoodMixologist {
  cocktails$: Observable<Cocktail[]> = of([]);
  isLoading = false;
  selectedMoodKey: string | null = null;
  moodMap = moodMap;

  constructor(private cocktailService: CocktailService) {}

  onMoodSelected(moodKey: string) {
    this.isLoading = true;
    this.selectedMoodKey = moodKey;
    this.cocktails$ = this.cocktailService.getCocktailsForMood(moodKey);
    this.cocktails$.subscribe(() => (this.isLoading = false));
  }
}
