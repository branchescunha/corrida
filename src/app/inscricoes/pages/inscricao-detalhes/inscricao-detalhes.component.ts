import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import { EventoHeader } from '../../components/evento-header/evento-header.component';
import { InscricaoService } from '../../services/inscricao.service';
import { ConfirmacaoModal } from '../../../shared/confirmacao-modal/confirmacao-modal.component';
import {
  formatarCategoria,
  formatarData,
  formatarDistancia,
} from '../../../shared/utils/formatacao.utils';

@Component({
  selector: 'app-inscricao-detalhes',
  imports: [
    RouterLink,
    EventoHeader,
    ConfirmacaoModal,
  ],
  templateUrl: './inscricao-detalhes.component.html',
  styleUrl: './inscricao-detalhes.component.css',
})
export class InscricaoDetalhes {
  readonly inscricaoService = inject(InscricaoService);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly email =
    this.route.snapshot.paramMap.get('email') ?? '';

  mostrarConfirmacao = false;
  mensagemErro: string | null = null;

  readonly formatarData = formatarData;
  readonly formatarCategoria = formatarCategoria;
  readonly formatarDistancia = formatarDistancia;

  get inscricao() {
    return this.inscricaoService.buscarDetalhadaPorEmail(
      this.email,
    );
  }

  confirmarCancelamento(): void {
    const resultado =
      this.inscricaoService.cancelar(this.email);

    if (!resultado.sucesso) {
      this.mensagemErro =
        'Não foi possível cancelar a inscrição.';

      this.mostrarConfirmacao = false;
      return;
    }

    void this.router.navigate(['/inscricoes']);
  }
}