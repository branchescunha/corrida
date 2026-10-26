import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventoHeader } from '../../components/evento-header/evento-header.component';
import { InscricaoCard } from '../../components/inscricao-card/inscricao-card.component';
import { InscricaoDetalhada } from '../../models/inscricao.model';
import { InscricaoService } from '../../services/inscricao.service';
import { ConfirmacaoModal } from '../../../shared/confirmacao-modal/confirmacao-modal.component';

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

  inscricaoParaCancelar: InscricaoDetalhada | null = null;
  mensagemErro: string | null = null;

  abrirCancelamento(inscricao: InscricaoDetalhada): void {
    this.inscricaoParaCancelar = inscricao;
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
      this.mensagemErro =
        'Não foi possível cancelar a inscrição.';
    }

    this.fecharCancelamento();
  }
}