import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailDisplay } from './cocktail-display';
import { Cocktail } from '../cocktail.model';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('CocktailDisplay', () => {
  let component: CocktailDisplay;
  let fixture: ComponentFixture<CocktailDisplay>;

  const mockCocktails: Cocktail[] = Array.from({ length: 20 }).map(
    (_, i) =>
      ({
        idDrink: `id${i}`,
        strDrink: `Cocktail ${i}`,
        strDrinkThumb: `thumb${i}.jpg`,
      } as Cocktail)
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDisplay],
      providers: [
        provideRouter([]), 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailDisplay);
    component = fixture.componentInstance;
    component.cocktails = [];
    component.displayedCocktailsCount = 12;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial number of cocktails', () => {
    component.cocktails = mockCocktails;
    fixture.detectChanges();

    const cocktailCards = fixture.debugElement.queryAll(By.css('.cocktail-card'));
    expect(cocktailCards.length).toBe(12); 
  });

  it('should show the Load More button when there are more cocktails than initially displayed', () => {
    component.cocktails = mockCocktails;
    component.displayedCocktailsCount = 12;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeTruthy();
    expect(loadMoreButton.nativeElement.textContent).toContain('Load More');
  });

  it('should load more cocktails when the Load More button is clicked', () => {
    component.cocktails = mockCocktails;
    component.displayedCocktailsCount = 12;
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    loadMoreButton.nativeElement.click();
    fixture.detectChanges();

    const cocktailCards = fixture.debugElement.queryAll(By.css('.cocktail-card'));
    expect(cocktailCards.length).toBe(20); 
  });

  it('should hide the Load More button when all cocktails are displayed', () => {
    component.cocktails = mockCocktails;
    component.displayedCocktailsCount = mockCocktails.length; 
    fixture.detectChanges();

    const loadMoreButton = fixture.debugElement.query(By.css('button'));
    expect(loadMoreButton).toBeFalsy();
  });
});
