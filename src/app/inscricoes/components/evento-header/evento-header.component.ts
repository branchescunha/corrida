import { Component, inject } from '@angular/core';

import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle.component';
import { InscricaoService } from '../../services/inscricao.service';

@Component({
  selector: 'app-evento-header',
  imports: [ThemeToggle],
  templateUrl: './evento-header.component.html',
  styleUrl: './evento-header.component.css',
})
export class EventoHeader {
  readonly inscricaoService = inject(InscricaoService);
}