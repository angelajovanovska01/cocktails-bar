import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodMixologist } from './mood-mixologist';

describe('MoodMixologist', () => {
  let component: MoodMixologist;
  let fixture: ComponentFixture<MoodMixologist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodMixologist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodMixologist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
