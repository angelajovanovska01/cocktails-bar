import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { moodMap } from './mood-config';
import { Cocktail } from './cocktail.model';

interface ApiResponse {
  drinks: Cocktail[];
}

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
  private cache = new Map<string, Cocktail>();

  constructor(private http: HttpClient) {}

  getAllCocktails(): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}filter.php?c=Cocktail`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  searchCocktailByName(name: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}search.php?s=${name}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  listCocktailsByFirstLetter(letter: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}search.php?f=${letter}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  filterCocktailsByIngredient(ingredient: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}filter.php?i=${ingredient}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  filterCocktailsByAlcoholic(alcoholic: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}filter.php?a=${alcoholic}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  filterCocktailsByCategory(category: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}filter.php?c=${category}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  filterCocktailsByGlass(glass: string): Observable<Cocktail[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}filter.php?g=${glass}`).pipe(
      map((response) => response.drinks),
      catchError(this.handleError)
    );
  }

  getCocktailById(id: string): Observable<Cocktail> {
    if (this.cache.has(id)) {
      return of(this.cache.get(id)!);
    }

    return this.http.get<ApiResponse>(`${this.baseUrl}lookup.php?i=${id}`).pipe(
      map((response) => response.drinks[0]),
      tap((cocktail) => this.cache.set(id, cocktail)),
      catchError(this.handleError)
    );
  }

  getCocktailsForMood(mood: string): Observable<Cocktail[]> {
    const moodConfig = moodMap[mood];
    if (!moodConfig) {
      return throwError(() => new Error('Invalid mood selected.'));
    }

    const primaryIngredient =
      moodConfig.ingredients[Math.floor(Math.random() * moodConfig.ingredients.length)];

    return this.filterCocktailsByIngredient(primaryIngredient).pipe(
      switchMap((cocktails) => {
        if (cocktails && cocktails.length > 0) {
          return of(cocktails);
        } else {
          const fallbackCocktail =
            moodConfig.fallback[Math.floor(Math.random() * moodConfig.fallback.length)];
          return this.searchCocktailByName(fallbackCocktail);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
