import { Component, inject } from '@angular/core';

import { InscricaoService } from '../../services/inscricao.service';

@Component({
  selector: 'app-evento-header',
  imports: [],
  templateUrl: './evento-header.component.html',
  styleUrl: './evento-header.component.css',
})
export class EventoHeader {
  readonly inscricaoService = inject(InscricaoService);
}