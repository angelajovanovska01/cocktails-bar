import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { CocktailDetails } from './cocktail-details';
import { CocktailFacade } from '../cocktail.facade';
import { Cocktail } from '../cocktail.model';

describe('CocktailDetails', () => {
  let component: CocktailDetails;
  let fixture: ComponentFixture<CocktailDetails>;
  let mockCocktailFacade: jasmine.SpyObj<CocktailFacade>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute;

  const mockCocktail: Cocktail = {
    idDrink: '11007',
    strDrink: 'Margarita',
    strIngredient1: 'Tequila',
    strMeasure1: '2 oz',
    strIngredient2: 'Lime juice',
    strMeasure2: '1 oz',
    strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it.',
  } as Cocktail;

  beforeEach(async () => {
    mockCocktailFacade = jasmine.createSpyObj('CocktailFacade', ['loadCocktailById'], {
      selectedCocktail: of(mockCocktail),
      loading: of(false),
    });
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '11007',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [CocktailDetails],
      providers: [
        { provide: CocktailFacade, useValue: mockCocktailFacade },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cocktail on init', () => {
    component.ngOnInit();
    expect(mockCocktailFacade.loadCocktailById).toHaveBeenCalledWith('11007');
  });

  it('should get ingredients from cocktail', () => {
    const ingredients = component.getIngredients(mockCocktail);
    expect(ingredients.length).toBe(2);
    expect(ingredients[0]).toEqual({ name: 'Tequila', measure: '2 oz' });
    expect(ingredients[1]).toEqual({ name: 'Lime juice', measure: '1 oz' });
  });

  it('should go back when goBack is called', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
