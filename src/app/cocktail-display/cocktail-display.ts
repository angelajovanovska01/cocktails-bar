import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Cocktail } from '../cocktail.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cocktail-display',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cocktail-display.html',
  styleUrls: ['./cocktail-display.css'],
})
export class CocktailDisplay {
  @Input() cocktails!: Cocktail[];
}
