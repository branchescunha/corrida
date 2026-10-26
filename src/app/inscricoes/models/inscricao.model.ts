import {
  Categoria,
  Distancia,
  ErroRegulamento,
} from '../../dominio/inscricao.regras';

export interface Inscricao {
  nome: string;
  email: string;
  nascimento: string;
  distancia: Distancia;
}

export interface InscricaoDetalhada extends Inscricao {
  idadeNaProva: number;
  categoria: Categoria | null;
}

export type ErroOperacaoInscricao =
  | ErroRegulamento
  | 'EMAIL_DUPLICADO'
  | 'NAO_ENCONTRADA'
  | 'ARMAZENAMENTO';

export interface ResultadoOperacao {
  sucesso: boolean;
  erro: ErroOperacaoInscricao | null;
}