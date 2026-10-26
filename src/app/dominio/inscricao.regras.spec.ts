import { describe, expect, it } from 'vitest';

import {
  DATA_PROVA,
  avaliarInscricao,
  calcularIdade,
  normalizarEmail,
} from './inscricao.regras';

describe('normalizarEmail', () => {
  it('deve remover espaços das extremidades e converter para minúsculas', () => {
    expect(normalizarEmail(' Ana.Souza@Email.COM ')).toBe(
      'ana.souza@email.com',
    );
  });
});

describe('calcularIdade', () => {
  it('deve considerar aniversário anterior à data de referência', () => {
    expect(calcularIdade('2000-03-10', DATA_PROVA)).toBe(27);
  });

  it('deve considerar aniversário no mesmo dia da data de referência', () => {
    expect(calcularIdade('2000-03-14', DATA_PROVA)).toBe(27);
  });

  it('deve descontar um ano quando o aniversário ainda não ocorreu', () => {
    expect(calcularIdade('2000-03-15', DATA_PROVA)).toBe(26);
  });
});

describe('avaliarInscricao', () => {
  it('deve recusar participante com menos de 14 anos', () => {
    expect(avaliarInscricao('2013-03-15', 'KM_5', DATA_PROVA)).toEqual({
      aceita: false,
      idadeNaProva: 13,
      categoria: null,
      erro: 'IDADE_MINIMA',
    });
  });

  it('deve aceitar participante com exatamente 14 anos nos 5 km', () => {
    expect(avaliarInscricao('2013-03-14', 'KM_5', DATA_PROVA)).toEqual({
      aceita: true,
      idadeNaProva: 14,
      categoria: 'JUVENIL',
      erro: null,
    });
  });

  it('deve recusar participante de 17 anos nos 10 km', () => {
    expect(avaliarInscricao('2009-03-15', 'KM_10', DATA_PROVA)).toEqual({
      aceita: false,
      idadeNaProva: 17,
      categoria: null,
      erro: 'DISTANCIA_NAO_PERMITIDA',
    });
  });

  it('deve aceitar participante com exatamente 18 anos nos 10 km', () => {
    expect(avaliarInscricao('2009-03-14', 'KM_10', DATA_PROVA)).toEqual({
      aceita: true,
      idadeNaProva: 18,
      categoria: 'ADULTO',
      erro: null,
    });
  });

  it('deve classificar 39 anos como adulto', () => {
    expect(
      avaliarInscricao('1987-03-15', 'KM_5', DATA_PROVA).categoria,
    ).toBe('ADULTO');
  });

  it('deve classificar 40 anos como master', () => {
    expect(
      avaliarInscricao('1987-03-14', 'KM_5', DATA_PROVA).categoria,
    ).toBe('MASTER');
  });

  it('deve classificar 59 anos como master', () => {
    expect(
      avaliarInscricao('1967-03-15', 'KM_5', DATA_PROVA).categoria,
    ).toBe('MASTER');
  });

  it('deve classificar 60 anos como sênior', () => {
    expect(
      avaliarInscricao('1967-03-14', 'KM_5', DATA_PROVA).categoria,
    ).toBe('SENIOR');
  });

  it('deve priorizar idade mínima antes da restrição dos 10 km', () => {
    expect(avaliarInscricao('2013-03-15', 'KM_10', DATA_PROVA).erro).toBe(
      'IDADE_MINIMA',
    );
  });
});