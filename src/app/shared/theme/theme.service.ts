import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'corrida.tema';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeState = signal<Theme>(
    this.carregarTema(),
  );

  readonly theme = this.themeState.asReadonly();

  constructor() {
    this.aplicarTema(this.themeState());
  }

  alternar(): void {
    const novoTema: Theme =
      this.themeState() === 'light'
        ? 'dark'
        : 'light';

    this.themeState.set(novoTema);

    this.aplicarTema(novoTema);
    this.salvarTema(novoTema);
  }

  private carregarTema(): Theme {
    const temaSalvo = this.lerTemaSalvo();

    if (
      temaSalvo === 'light' ||
      temaSalvo === 'dark'
    ) {
      return temaSalvo;
    }

    return 'light';
  }

  private lerTemaSalvo(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(THEME_KEY);
  }

  private salvarTema(theme: Theme): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(THEME_KEY, theme);
  }

  private aplicarTema(theme: Theme): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset['theme'] = theme;
  }
}