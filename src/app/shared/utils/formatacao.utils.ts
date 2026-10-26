import { Categoria, Distancia } from '../../dominio/inscricao.regras';

export function formatarData(data: string): string {
  const [ano, mes, dia] = data.split('-');

  return `${dia}/${mes}/${ano}`;
}

export function formatarCategoria(categoria: Categoria | null): string {
  switch (categoria) {
    case 'JUVENIL':
      return 'Juvenil';

    case 'ADULTO':
      return 'Adulto';

    case 'MASTER':
      return 'Master';

    case 'SENIOR':
      return 'Sênior';

    default:
      return '-';
  }
}

export function formatarDistancia(distancia: Distancia): string {
  return distancia === 'KM_5' ? '5 km' : '10 km';
}