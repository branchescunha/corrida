import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

import { Loading } from './shared/loading/loading.component';
import { ThemeToggle } from './shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Loading,
    ThemeToggle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  readonly carregando = signal(false);

  private readonly router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.carregando.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.carregando.set(false);
      }
    });
  }
}