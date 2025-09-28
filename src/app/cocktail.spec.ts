import { TestBed } from '@angular/core/testing';
import { CocktailService } from './cocktail';
import { provideHttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

describe('CocktailService', () => {
  let service: CocktailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocktailService, provideHttpClient()],
    });
    service = TestBed.inject(CocktailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cocktails for a valid mood', (done) => {
    spyOn(service, 'filterCocktailsByIngredient').and.returnValue(
      of([{ idDrink: '1', strDrink: 'Mojito' } as any])
    );
    service.getCocktailsForMood('party').subscribe((cocktails: string | any[]) => {
      expect(cocktails.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should throw error for invalid mood', (done) => {
    service
      .getCocktailsForMood('invalid-mood')
      .pipe(
        catchError((err) => {
          expect(err).toBeTruthy();
          done();
          return of([]);
        })
      )
      .subscribe();
  });
});
