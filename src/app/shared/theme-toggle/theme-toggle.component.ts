import { Component, inject } from '@angular/core';

import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggle {
  readonly themeService = inject(ThemeService);
}