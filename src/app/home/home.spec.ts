import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home';
import { CocktailFacade } from '../cocktail.facade';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCocktailFacade: jasmine.SpyObj<CocktailFacade>;

  beforeEach(async () => {
    mockCocktailFacade = jasmine.createSpyObj('CocktailFacade', ['loadRandomCocktails'], {
      cocktails: of([]),
      loading: of(false),
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: CocktailFacade, useValue: mockCocktailFacade }],
      schemas: [NO_ERRORS_SCHEMA], // To ignore child components
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load random cocktails on init', () => {
    // ngOnInit is called by fixture.detectChanges()
    expect(mockCocktailFacade.loadCocktails).toHaveBeenCalledWith(10);
  });

  it('should load more cocktails when loadMore is called', () => {
    // Reset the spy to test the explicit call
    mockCocktailFacade.loadCocktails.calls.reset();
    component.loadMore();
    expect(mockCocktailFacade.loadCocktails).toHaveBeenCalledWith(10);
  });
});
