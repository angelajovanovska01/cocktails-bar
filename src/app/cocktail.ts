import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) { }

  getRandomCocktail(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}random.php`);
  }

  searchCocktailByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search.php?s=${name}`);
  }

  listCocktailsByFirstLetter(letter: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}search.php?f=${letter}`);
  }

  filterCocktailsByIngredient(ingredient: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}filter.php?i=${ingredient}`);
  }

  filterCocktailsByAlcoholic(alcoholic: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}filter.php?a=${alcoholic}`);
  }

  filterCocktailsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}filter.php?c=${category}`);
  }

  filterCocktailsByGlass(glass: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}filter.php?g=${glass}`);
  }
}
