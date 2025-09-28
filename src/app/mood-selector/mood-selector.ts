import { Component, EventEmitter, Output } from '@angular/core';
import { moodMap } from '../mood-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mood-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-selector.html',
  styleUrls: ['./mood-selector.css'],
})
export class MoodSelectorComponent {
  @Output() moodSelected = new EventEmitter<string>();

  moods = Object.keys(moodMap);
  moodMap = moodMap;
  isLoading = false;

  selectMood(mood: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.moodSelected.emit(mood);
      this.isLoading = false;
    }, 500); // Simulate a delay
  }
}
