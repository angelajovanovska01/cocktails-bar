import { Routes } from '@angular/router';
import { CocktailDisplay } from './cocktail-display/cocktail-display';
import { CocktailDetails } from './cocktail-details/cocktail-details';

export const routes: Routes = [
  { path: 'random-cocktail', component: CocktailDisplay },
  { path: 'search/:filterType/:filterValue', component: CocktailDisplay },
  { path: 'search-by-name/:name', component: CocktailDisplay },
  { path: 'cocktail/:id', component: CocktailDetails },
  { path: 'all', component: CocktailDisplay },
  { path: 'filter-by-ingredient/:ingredient', component: CocktailDisplay },
  { path: 'filter-by-alcoholic/:alcoholic', component: CocktailDisplay },
  { path: 'filter-by-category/:category', component: CocktailDisplay },
  { path: 'filter-by-glass/:glass', component: CocktailDisplay },
  { path: '', redirectTo: 'random-cocktail', pathMatch: 'full' },
];
