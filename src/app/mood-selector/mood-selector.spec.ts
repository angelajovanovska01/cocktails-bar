import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodSelectorComponent } from './mood-selector';

describe('MoodSelectorComponent', () => {
  let component: MoodSelectorComponent;
  let fixture: ComponentFixture<MoodSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit mood when selectMood is called', () => {
    spyOn(component.moodSelected, 'emit');
    const testMood = 'party';
    component.selectMood(testMood);
    expect(component.moodSelected.emit).toHaveBeenCalledWith(testMood);
  });
});
