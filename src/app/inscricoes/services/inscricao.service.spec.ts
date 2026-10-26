import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { InscricaoService, CHAVE_INSCRICOES } from './inscricao.service';

describe('InscricaoService', () => {
  let service: InscricaoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscricaoService);
  });

  it('deve iniciar com lista vazia', () => {
    expect(service.inscricoes()).toEqual([]);
    expect(service.total()).toBe(0);
    expect(service.total5Km()).toBe(0);
    expect(service.total10Km()).toBe(0);
  });

  it('deve cadastrar inscrição e atualizar os totais', () => {
    const resultado = service.cadastrar({
      nome: 'Ana Souza',
      email: ' ANA@EMAIL.COM ',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    expect(resultado.sucesso).toBe(true);
    expect(service.total()).toBe(1);
    expect(service.total5Km()).toBe(1);
    expect(service.total10Km()).toBe(0);
    expect(service.inscricoes()[0].email).toBe('ana@email.com');
  });

  it('deve impedir e-mail duplicado após normalização', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'Ana@Email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    const resultado = service.cadastrar({
      nome: 'Outra Pessoa',
      email: ' ana@email.COM ',
      nascimento: '1990-01-10',
      distancia: 'KM_5',
    });

    expect(resultado).toEqual({
      sucesso: false,
      erro: 'EMAIL_DUPLICADO',
    });

    expect(service.total()).toBe(1);
  });

  it('deve recusar cadastro inválido sem alterar o estado', () => {
    const resultado = service.cadastrar({
      nome: 'Participante Jovem',
      email: 'jovem@email.com',
      nascimento: '2015-01-01',
      distancia: 'KM_5',
    });

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe('IDADE_MINIMA');
    expect(service.total()).toBe(0);
  });

  it('deve buscar inscrição por e-mail normalizado', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    const inscricao = service.buscarPorEmail(' ANA@EMAIL.COM ');

    expect(inscricao?.nome).toBe('Ana Souza');
  });

  it('deve atualizar sem alterar e-mail, posição ou total', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    service.cadastrar({
      nome: 'Bruno Lima',
      email: 'bruno@email.com',
      nascimento: '1990-01-10',
      distancia: 'KM_5',
    });

    const resultado = service.atualizar('ana@email.com', {
      nome: 'Ana Souza Atualizada',
      nascimento: '2000-01-10',
      distancia: 'KM_10',
    });

    expect(resultado.sucesso).toBe(true);
    expect(service.total()).toBe(2);
    expect(service.inscricoes()[0].email).toBe('ana@email.com');
    expect(service.inscricoes()[0].nome).toBe(
      'Ana Souza Atualizada',
    );
    expect(service.inscricoes()[0].distancia).toBe('KM_10');
    expect(service.total5Km()).toBe(1);
    expect(service.total10Km()).toBe(1);
  });

  it('deve preservar os dados quando uma edição for recusada', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    const antes = service.inscricoes()[0];

    const resultado = service.atualizar('ana@email.com', {
      nome: 'Ana Alterada',
      nascimento: '2015-01-01',
      distancia: 'KM_10',
    });

    expect(resultado.sucesso).toBe(false);
    expect(service.inscricoes()[0]).toEqual(antes);
  });

  it('deve cancelar inscrição e liberar o e-mail para novo cadastro', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    expect(service.cancelar('ana@email.com').sucesso).toBe(true);
    expect(service.total()).toBe(0);

    const recadastro = service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_10',
    });

    expect(recadastro.sucesso).toBe(true);
  });

  it('deve persistir inscrições no localStorage', () => {
    service.cadastrar({
      nome: 'Ana Souza',
      email: 'ana@email.com',
      nascimento: '2000-01-10',
      distancia: 'KM_5',
    });

    const armazenado = localStorage.getItem(CHAVE_INSCRICOES);

    expect(armazenado).not.toBeNull();
    expect(JSON.parse(armazenado ?? '[]')).toHaveLength(1);
  });

  it('deve recuperar inscrições do localStorage', () => {
    localStorage.setItem(
      CHAVE_INSCRICOES,
      JSON.stringify([
        {
          nome: 'Ana Souza',
          email: 'ana@email.com',
          nascimento: '2000-01-10',
          distancia: 'KM_5',
        },
      ]),
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const novoService = TestBed.inject(InscricaoService);

    expect(novoService.total()).toBe(1);
    expect(novoService.inscricoes()[0].email).toBe(
      'ana@email.com',
    );
  });

  it('deve continuar utilizável quando o JSON estiver corrompido', () => {
    localStorage.setItem(CHAVE_INSCRICOES, '{json inválido');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const novoService = TestBed.inject(InscricaoService);

    expect(novoService.inscricoes()).toEqual([]);
    expect(novoService.aviso()).not.toBeNull();
  });
});