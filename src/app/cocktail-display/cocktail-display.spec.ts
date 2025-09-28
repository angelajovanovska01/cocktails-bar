import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDisplay } from './cocktail-display';

describe('CocktailDisplay', () => {
  let component: CocktailDisplay;
  let fixture: ComponentFixture<CocktailDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDisplay);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
