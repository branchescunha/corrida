export type Distancia = 'KM_5' | 'KM_10';

export type Categoria = 'JUVENIL' | 'ADULTO' | 'MASTER' | 'SENIOR';

export type ErroRegulamento =
  | 'IDADE_MINIMA'
  | 'DISTANCIA_NAO_PERMITIDA';

export interface AvaliacaoInscricao {
  aceita: boolean;
  idadeNaProva: number;
  categoria: Categoria | null;
  erro: ErroRegulamento | null;
}

export const DATA_PROVA = '2027-03-14';

export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function calcularIdade(
  nascimento: string,
  referencia: string,
): number {
  const [anoNascimento, mesNascimento, diaNascimento] = nascimento
    .split('-')
    .map(Number);

  const [anoReferencia, mesReferencia, diaReferencia] = referencia
    .split('-')
    .map(Number);

  let idade = anoReferencia - anoNascimento;

  const aniversarioAindaNaoOcorreu =
    mesReferencia < mesNascimento ||
    (mesReferencia === mesNascimento && diaReferencia < diaNascimento);

  if (aniversarioAindaNaoOcorreu) {
    idade--;
  }

  return idade;
}

export function avaliarInscricao(
  nascimento: string,
  distancia: Distancia,
  dataProva: string,
): AvaliacaoInscricao {
  const idadeNaProva = calcularIdade(nascimento, dataProva);

  if (idadeNaProva < 14) {
    return {
      aceita: false,
      idadeNaProva,
      categoria: null,
      erro: 'IDADE_MINIMA',
    };
  }

  if (distancia === 'KM_10' && idadeNaProva < 18) {
    return {
      aceita: false,
      idadeNaProva,
      categoria: null,
      erro: 'DISTANCIA_NAO_PERMITIDA',
    };
  }

  return {
    aceita: true,
    idadeNaProva,
    categoria: obterCategoria(idadeNaProva),
    erro: null,
  };
}

function obterCategoria(idade: number): Categoria {
  if (idade <= 17) {
    return 'JUVENIL';
  }

  if (idade <= 39) {
    return 'ADULTO';
  }

  if (idade <= 59) {
    return 'MASTER';
  }

  return 'SENIOR';
}