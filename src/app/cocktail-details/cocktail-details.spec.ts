import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDetails } from './cocktail-details';

describe('CocktailDetails', () => {
  let component: CocktailDetails;
  let fixture: ComponentFixture<CocktailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //it('should render cocktail name', () => {
 // component.cocktailFacede = { name: 'Margarita', instructions: 'Shake with ice', id: '1' };
 // fixture.detectChanges();

 // const compiled = fixture.nativeElement as HTMLElement;
 // expect(compiled.querySelector('h2')?.textContent).toContain('Margarita');
//});
});
