import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoodMixologist } from './mood-mixologist';
import { CocktailService } from '../cocktail';
import { Cocktail } from '../cocktail.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { scheduled, asyncScheduler } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('MoodMixologist', () => {
  let component: MoodMixologist;
  let fixture: ComponentFixture<MoodMixologist>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockCocktails: Cocktail[] = [{ idDrink: '11007', strDrink: 'Margarita' } as Cocktail];

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailsForMood']);
    mockCocktailService.getCocktailsForMood.and.returnValue(
      scheduled([mockCocktails], asyncScheduler)
    );

    await TestBed.configureTestingModule({
      imports: [MoodMixologist],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodMixologist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCocktailsForMood on mood selection', fakeAsync(() => {
    const mood = 'party';
    component.onMoodSelected(mood);

    expect(component.isLoading).toBe(true);
    expect(component.selectedMoodKey).toBe(mood);
    expect(mockCocktailService.getCocktailsForMood).toHaveBeenCalledWith(mood);

    tick();
    fixture.detectChanges();

    component.cocktails$.subscribe((cocktails) => {
      expect(cocktails).toEqual(mockCocktails);
    });

    expect(component.isLoading).toBe(false);
  }));

  it('should set isLoading to true and then false during mood selection', fakeAsync(() => {
    const mood = 'chill';
    component.onMoodSelected(mood);

    expect(component.isLoading).toBe(true);

    tick();
    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
  }));
});
