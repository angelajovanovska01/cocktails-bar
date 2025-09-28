import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailDisplay } from './cocktail-display';
import { By } from '@angular/platform-browser';

describe('CocktailDisplay', () => {
  let component: CocktailDisplay;
  let fixture: ComponentFixture<CocktailDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailDisplay);
    component = fixture.componentInstance;
    component.cocktails = []; // Initialize cocktails to prevent template errors
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the centered class when centerGrid is true', () => {
    fixture.detectChanges();
    const gridElement = fixture.debugElement.query(By.css('.cocktail-grid'));
    expect(gridElement.nativeElement.classList.contains('centered')).toBe(true);
  });

  it('should not apply the centered class when centerGrid is false', () => {
    fixture.detectChanges();
    const gridElement = fixture.debugElement.query(By.css('.cocktail-grid'));
    expect(gridElement.nativeElement.classList.contains('centered')).toBe(false);
  });
});
