import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventoHeader } from '../../components/evento-header/evento-header.component';
import { InscricaoCard } from '../../components/inscricao-card/inscricao-card.component';
import { InscricaoDetalhada } from '../../models/inscricao.model';
import { InscricaoService } from '../../services/inscricao.service';
import { ConfirmacaoModal } from '../../../shared/confirmacao-modal/confirmacao-modal.component';

type FiltroDistancia = 'TODOS' | 'KM_5' | 'KM_10';

@Component({
  selector: 'app-inscricoes-lista',
  imports: [
    RouterLink,
    EventoHeader,
    InscricaoCard,
    ConfirmacaoModal,
  ],
  templateUrl: './inscricoes-lista.component.html',
  styleUrl: './inscricoes-lista.component.css',
})
export class InscricoesLista {
  readonly inscricaoService = inject(InscricaoService);

  readonly filtro = signal<FiltroDistancia>('TODOS');

  readonly inscricoesFiltradas = computed(() => {
    const inscricoes = this.inscricaoService.inscricoesDetalhadas();
    const filtro = this.filtro();

    if (filtro === 'TODOS') {
      return inscricoes;
    }

    return inscricoes.filter(
      (inscricao) => inscricao.distancia === filtro,
    );
  });

  inscricaoParaCancelar: InscricaoDetalhada | null = null;
  mensagemErro: string | null = null;

  selecionarFiltro(filtro: FiltroDistancia): void {
    this.filtro.set(filtro);
  }

  abrirCancelamento(inscricao: InscricaoDetalhada): void {
    this.inscricaoParaCancelar = inscricao;
    this.mensagemErro = null;
  }

  fecharCancelamento(): void {
    this.inscricaoParaCancelar = null;
  }

  confirmarCancelamento(): void {
    if (!this.inscricaoParaCancelar) {
      return;
    }

    const resultado = this.inscricaoService.cancelar(
      this.inscricaoParaCancelar.email,
    );

    if (!resultado.sucesso) {
      this.mensagemErro = 'Não foi possível cancelar a inscrição.';
      this.fecharCancelamento();
      return;
    }

    this.fecharCancelamento();
  }
}