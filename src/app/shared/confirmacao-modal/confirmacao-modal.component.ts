import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-confirmacao-modal',
  imports: [],
  templateUrl: './confirmacao-modal.component.html',
  styleUrl: './confirmacao-modal.component.css',
})
export class ConfirmacaoModal {
  @Input()
  aberto = false;

  @Input()
  titulo = 'Confirmar ação';

  @Input()
  mensagem = '';

  @Output()
  confirmar = new EventEmitter<void>();

  @Output()
  fechar = new EventEmitter<void>();
}