import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { InscricaoDetalhada } from '../../models/inscricao.model';
import {
  formatarCategoria,
  formatarData,
  formatarDistancia,
} from '../../../shared/utils/formatacao.utils';

@Component({
  selector: 'app-inscricao-card',
  imports: [RouterLink],
  templateUrl: './inscricao-card.component.html',
  styleUrl: './inscricao-card.component.css',
})
export class InscricaoCard {
  @Input({ required: true })
  inscricao!: InscricaoDetalhada;

  @Output()
  cancelar = new EventEmitter<InscricaoDetalhada>();

  readonly formatarData = formatarData;
  readonly formatarCategoria = formatarCategoria;
  readonly formatarDistancia = formatarDistancia;
}