import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();

    document.documentElement.removeAttribute(
      'data-theme',
    );

    TestBed.configureTestingModule({});
  });

  it('deve iniciar com tema claro quando não existir preferência salva', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');

    expect(
      document.documentElement.dataset['theme'],
    ).toBe('light');
  });

  it('deve alternar do tema claro para o escuro', () => {
    const service = TestBed.inject(ThemeService);

    service.alternar();

    expect(service.theme()).toBe('dark');

    expect(
      document.documentElement.dataset['theme'],
    ).toBe('dark');
  });

  it('deve salvar o tema escolhido no localStorage', () => {
    const service = TestBed.inject(ThemeService);

    service.alternar();

    expect(
      localStorage.getItem('corrida.tema'),
    ).toBe('dark');
  });

  it('deve recuperar o tema salvo no localStorage', () => {
    localStorage.setItem(
      'corrida.tema',
      'dark',
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');

    expect(
      document.documentElement.dataset['theme'],
    ).toBe('dark');
  });

  it('deve voltar do tema escuro para o claro', () => {
    localStorage.setItem(
      'corrida.tema',
      'dark',
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);

    service.alternar();

    expect(service.theme()).toBe('light');

    expect(
      localStorage.getItem('corrida.tema'),
    ).toBe('light');
  });
});