import { computed, Injectable, signal } from '@angular/core';

import {
  DATA_PROVA,
  avaliarInscricao,
  normalizarEmail,
} from '../../dominio/inscricao.regras';
import {
  Inscricao,
  InscricaoDetalhada,
  ResultadoOperacao,
} from '../models/inscricao.model';

export const CHAVE_INSCRICOES = 'corrida.inscricoes.v1';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  private readonly inscricoesState = signal<Inscricao[]>([]);

  readonly inscricoes = this.inscricoesState.asReadonly();
  readonly aviso = signal<string | null>(null);

  readonly total = computed(() => this.inscricoesState().length);

  readonly total5Km = computed(
    () =>
      this.inscricoesState().filter(
        (inscricao) => inscricao.distancia === 'KM_5',
      ).length,
  );

  readonly total10Km = computed(
    () =>
      this.inscricoesState().filter(
        (inscricao) => inscricao.distancia === 'KM_10',
      ).length,
  );

  readonly inscricoesDetalhadas = computed<InscricaoDetalhada[]>(() =>
    this.inscricoesState().map((inscricao) => this.detalhar(inscricao)),
  );

  constructor() {
    this.inscricoesState.set(this.carregar());
  }

  buscarPorEmail(email: string): Inscricao | undefined {
    const emailNormalizado = normalizarEmail(email);

    return this.inscricoesState().find(
      (inscricao) => inscricao.email === emailNormalizado,
    );
  }

  buscarDetalhadaPorEmail(email: string): InscricaoDetalhada | undefined {
    const inscricao = this.buscarPorEmail(email);

    return inscricao ? this.detalhar(inscricao) : undefined;
  }

  cadastrar(inscricao: Inscricao): ResultadoOperacao {
    const inscricaoNormalizada = this.normalizar(inscricao);

    if (this.buscarPorEmail(inscricaoNormalizada.email)) {
      return {
        sucesso: false,
        erro: 'EMAIL_DUPLICADO',
      };
    }

    const avaliacao = avaliarInscricao(
      inscricaoNormalizada.nascimento,
      inscricaoNormalizada.distancia,
      DATA_PROVA,
    );

    if (!avaliacao.aceita) {
      return {
        sucesso: false,
        erro: avaliacao.erro,
      };
    }

    const novasInscricoes = [
      ...this.inscricoesState(),
      inscricaoNormalizada,
    ];

    return this.salvar(novasInscricoes);
  }

  atualizar(
    email: string,
    dados: Omit<Inscricao, 'email'>,
  ): ResultadoOperacao {
    const emailNormalizado = normalizarEmail(email);
    const indice = this.inscricoesState().findIndex(
      (inscricao) => inscricao.email === emailNormalizado,
    );

    if (indice === -1) {
      return {
        sucesso: false,
        erro: 'NAO_ENCONTRADA',
      };
    }

    const inscricaoAtualizada = this.normalizar({
      ...dados,
      email: emailNormalizado,
    });

    const avaliacao = avaliarInscricao(
      inscricaoAtualizada.nascimento,
      inscricaoAtualizada.distancia,
      DATA_PROVA,
    );

    if (!avaliacao.aceita) {
      return {
        sucesso: false,
        erro: avaliacao.erro,
      };
    }

    const novasInscricoes = [...this.inscricoesState()];
    novasInscricoes[indice] = inscricaoAtualizada;

    return this.salvar(novasInscricoes);
  }

  cancelar(email: string): ResultadoOperacao {
    const emailNormalizado = normalizarEmail(email);

    if (!this.buscarPorEmail(emailNormalizado)) {
      return {
        sucesso: false,
        erro: 'NAO_ENCONTRADA',
      };
    }

    const novasInscricoes = this.inscricoesState().filter(
      (inscricao) => inscricao.email !== emailNormalizado,
    );

    return this.salvar(novasInscricoes);
  }

  limparAviso(): void {
    this.aviso.set(null);
  }

  private normalizar(inscricao: Inscricao): Inscricao {
    return {
      ...inscricao,
      nome: inscricao.nome.trim().replace(/\s+/g, ' '),
      email: normalizarEmail(inscricao.email),
    };
  }

  private detalhar(inscricao: Inscricao): InscricaoDetalhada {
    const avaliacao = avaliarInscricao(
      inscricao.nascimento,
      inscricao.distancia,
      DATA_PROVA,
    );

    return {
      ...inscricao,
      idadeNaProva: avaliacao.idadeNaProva,
      categoria: avaliacao.categoria,
    };
  }

  private carregar(): Inscricao[] {
    try {
      const dados = localStorage.getItem(CHAVE_INSCRICOES);

      if (!dados) {
        return [];
      }

      const inscricoes = JSON.parse(dados);

      if (!Array.isArray(inscricoes)) {
        throw new Error();
      }

      return inscricoes;
    } catch {
      this.aviso.set(
        'Não foi possível carregar as inscrições salvas. Uma lista vazia foi iniciada.',
      );

      return [];
    }
  }

  private salvar(inscricoes: Inscricao[]): ResultadoOperacao {
    try {
      localStorage.setItem(
        CHAVE_INSCRICOES,
        JSON.stringify(inscricoes),
      );

      this.inscricoesState.set(inscricoes);
      this.aviso.set(null);

      return {
        sucesso: true,
        erro: null,
      };
    } catch {
      this.aviso.set(
        'Não foi possível salvar as alterações. Tente novamente.',
      );

      return {
        sucesso: false,
        erro: 'ARMAZENAMENTO',
      };
    }
  }
}