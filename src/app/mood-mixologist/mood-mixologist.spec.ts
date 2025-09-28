import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MoodMixologist } from './mood-mixologist';
import { CocktailService } from '../cocktail';
import { Cocktail } from '../cocktail.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MoodMixologist', () => {
  let component: MoodMixologist;
  let fixture: ComponentFixture<MoodMixologist>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockCocktails: Cocktail[] = [
    { idDrink: '11007', strDrink: 'Margarita' } as Cocktail,
  ];

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailsForMood']);
    mockCocktailService.getCocktailsForMood.and.returnValue(of(mockCocktails));

    await TestBed.configureTestingModule({
      imports: [MoodMixologist],
      providers: [{ provide: CocktailService, useValue: mockCocktailService }],
      schemas: [NO_ERRORS_SCHEMA], // To ignore child components like app-mood-selector
    }).compileComponents();

    fixture = TestBed.createComponent(MoodMixologist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCocktailsForMood on mood selection', () => {
    const mood = 'party';
    component.onMoodSelected(mood);
    expect(mockCocktailService.getCocktailsForMood).toHaveBeenCalledWith(mood);
    component.cocktails$.subscribe(cocktails => {
      expect(cocktails).toEqual(mockCocktails);
    });
  });

  it('should set isLoading to true and then false during mood selection', () => {
    const mood = 'chill';
    component.onMoodSelected(mood);
    expect(component.isLoading).toBe(true);
    component.cocktails$.subscribe(() => {
      expect(component.isLoading).toBe(false);
    });
  });
});
