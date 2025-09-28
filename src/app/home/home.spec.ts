import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeComponent } from './home';
import { CocktailFacade } from '../cocktail.facade';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCocktailFacade: jasmine.SpyObj<CocktailFacade>;

  beforeEach(async () => {
    mockCocktailFacade = jasmine.createSpyObj('CocktailFacade', ['loadCocktails'], {
      cocktails: of([]),
      loading: of(false),
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: CocktailFacade, useValue: mockCocktailFacade },
        provideHttpClient(),
        provideRouter([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load random cocktails on init', () => {
    expect(mockCocktailFacade.loadCocktails).toHaveBeenCalledWith(10);
  });

  it('should load more cocktails when loadMore is called', () => {
    mockCocktailFacade.loadCocktails.calls.reset();
    component.loadMore();
    expect(mockCocktailFacade.loadCocktails).toHaveBeenCalledWith(10);
  });
});
