import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodSelectorComponent } from './mood-selector';
import { moodMap } from '../mood-config';
import { CommonModule } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MoodSelectorComponent', () => {
  let component: MoodSelectorComponent;
  let fixture: ComponentFixture<MoodSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodSelectorComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize moods from moodMap', () => {
    const expectedMoods = Object.keys(moodMap);
    expect(component.moods).toEqual(expectedMoods);
  });

  it('should emit moodSelected event when selectMood is called', fakeAsync(() => {
    spyOn(component.moodSelected, 'emit');
    const testMood = 'party';
    component.selectMood(testMood);

    expect(component.isLoading).toBeTrue();

    tick(500);

    expect(component.moodSelected.emit).toHaveBeenCalledWith(testMood);
    expect(component.isLoading).toBeFalse();
  }));

  it('should display mood labels in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const moodElements = compiled.querySelectorAll('.mood-button');

    expect(moodElements.length).toBe(Object.keys(moodMap).length);
    expect(moodElements[0].textContent).toContain(moodMap[component.moods[0]].label);
    expect(moodElements[1].textContent).toContain(moodMap[component.moods[1]].label);
  });
});
