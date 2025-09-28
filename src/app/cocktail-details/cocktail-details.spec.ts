import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of, BehaviorSubject } from 'rxjs';
import { CocktailDetails } from './cocktail-details';
import { CocktailFacade } from '../cocktail.facade';
import { Cocktail } from '../cocktail.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

describe('CocktailDetails', () => {
  let component: CocktailDetails;
  let fixture: ComponentFixture<CocktailDetails>;
  let mockCocktailFacade: any;
  let mockActivatedRoute: any;
  let mockLocation: any;

  const mockCocktail: Cocktail = {
    idDrink: '12345',
    strDrink: 'Test Cocktail',
    strDrinkThumb: 'test.jpg',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Highball glass',
    strInstructions: 'Mix ingredients and serve.',
    strIngredient1: 'Vodka',
    strMeasure1: '1.5 oz',
    strIngredient2: 'Orange Juice',
    strMeasure2: '4 oz',
    strIngredient3: null,
    strMeasure3: null,
  };

  beforeEach(async () => {
    mockCocktailFacade = {
      selectedCocktail: new BehaviorSubject<Cocktail | null>(null),
      loading: new BehaviorSubject<boolean>(false),
      loadCocktailById: jasmine.createSpy('loadCocktailById'),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => {
            if (key === 'id') {
              return '12345';
            }
            return null;
          },
        },
      },
    };

    mockLocation = {
      back: jasmine.createSpy('back'),
    };

    await TestBed.configureTestingModule({
      imports: [
        CocktailDetails, // Import the standalone component
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatListModule,
        MatDividerModule,
      ],
      providers: [
        { provide: CocktailFacade, useValue: mockCocktailFacade },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cocktail by id on ngOnInit', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockCocktailFacade.loadCocktailById).toHaveBeenCalledWith('12345');
  });

  it('should return correct ingredients', () => {
    const ingredients = component.getIngredients(mockCocktail);
    expect(ingredients.length).toBe(2);
    expect(ingredients[0]).toEqual({ name: 'Vodka', measure: '1.5 oz' });
    expect(ingredients[1]).toEqual({ name: 'Orange Juice', measure: '4 oz' });
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should display cocktail details when available', () => {
    mockCocktailFacade.selectedCocktail.next(mockCocktail);
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.cocktail-title');
    expect(titleElement.textContent).toContain('Test Cocktail');

    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('.cocktail-image');
    expect(imageElement.src).toContain('test.jpg');
    expect(imageElement.alt).toContain('Test Cocktail');

    const categoryChip: HTMLElement = fixture.nativeElement.querySelector('mat-chip');
    expect(categoryChip.textContent).toContain('Ordinary Drink');

    const ingredientItems = fixture.nativeElement.querySelectorAll('.ingredients-list mat-list-item');
    expect(ingredientItems.length).toBe(2);
    expect(ingredientItems[0].textContent).toContain('Vodka');
    expect(ingredientItems[0].textContent).toContain('1.5 oz');

    const instructionsElement: HTMLElement = fixture.nativeElement.querySelector('.instructions');
    expect(instructionsElement.textContent).toContain('Mix ingredients and serve.');
  });

  it('should show loading indicator when loading', () => {
    mockCocktailFacade.loading.next(true);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should hide loading indicator when not loading', () => {
    mockCocktailFacade.loading.next(false);
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeFalsy();
  });
});