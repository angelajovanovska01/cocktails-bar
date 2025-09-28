import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cocktail } from './cocktail.model';
import { CocktailService } from './cocktail';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailFacade {
  private cocktails$ = new BehaviorSubject<Cocktail[]>([]);
  private selectedCocktail$ = new BehaviorSubject<Cocktail | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private cocktailService: CocktailService) { }

  get cocktails(): Observable<Cocktail[]> {
    return this.cocktails$.asObservable();
  }

  get selectedCocktail(): Observable<Cocktail | null> {
    return this.selectedCocktail$.asObservable();
  }

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  loadCocktails(count: number): void {
    this.loading$.next(true);
    this.cocktailService.getAllCocktails().pipe(
      tap(() => this.loading$.next(false))
    ).subscribe(cocktails => {
      this.cocktails$.next(cocktails);
    });
  }

  loadCocktailById(id: string): void {
    this.loading$.next(true);
    this.cocktailService.getCocktailById(id).pipe(
      tap(() => this.loading$.next(false))
    ).subscribe(cocktail => {
      this.selectedCocktail$.next(cocktail);
    });
  }

  searchCocktails(query: string): void {
    this.loading$.next(true);
    this.cocktailService.searchCocktailByName(query).pipe(
      tap(() => this.loading$.next(false))
    ).subscribe(cocktails => {
      this.cocktails$.next(cocktails);
    });
  }
}
