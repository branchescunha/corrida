import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import { Distancia } from '../../../dominio/inscricao.regras';
import { InscricaoService } from '../../services/inscricao.service';
import {
  emailValidator,
  nascimentoValidator,
  nomeValidator,
} from '../../validators/inscricao.validators';

@Component({
  selector: 'app-inscricao-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inscricao-form.component.html',
  styleUrl: './inscricao-form.component.css',
})
export class InscricaoForm {
  private readonly fb = inject(FormBuilder);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly emailOriginal = this.route.snapshot.paramMap.get('email');
  readonly modoEdicao = this.emailOriginal !== null;

  mensagemErro: string | null = null;
  inscricaoNaoEncontrada = false;

  readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, nomeValidator]],
    email: ['', [Validators.required, emailValidator]],
    nascimento: [
      '',
      [Validators.required, nascimentoValidator],
    ],
    distancia: this.fb.nonNullable.control<Distancia | ''>(
      '',
      Validators.required,
    ),
  });

  constructor() {
    if (this.modoEdicao && this.emailOriginal) {
      this.carregarInscricao(this.emailOriginal);
    }
  }

  salvar(): void {
    this.mensagemErro = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();

    const resultado = this.modoEdicao
      ? this.inscricaoService.atualizar(
          this.emailOriginal!,
          {
            nome: valores.nome,
            nascimento: valores.nascimento,
            distancia: valores.distancia as Distancia,
          },
        )
      : this.inscricaoService.cadastrar({
          nome: valores.nome,
          email: valores.email,
          nascimento: valores.nascimento,
          distancia: valores.distancia as Distancia,
        });

    if (!resultado.sucesso) {
      this.mensagemErro = this.obterMensagemErro(
        resultado.erro,
      );

      return;
    }

    if (!this.modoEdicao) {
      this.form.reset({
        nome: '',
        email: '',
        nascimento: '',
        distancia: '',
      });
    }

    void this.router.navigate(['/inscricoes']);
  }

  private carregarInscricao(email: string): void {
    const inscricao =
      this.inscricaoService.buscarPorEmail(email);

    if (!inscricao) {
      this.inscricaoNaoEncontrada = true;
      return;
    }

    this.form.setValue({
      nome: inscricao.nome,
      email: inscricao.email,
      nascimento: inscricao.nascimento,
      distancia: inscricao.distancia,
    });

    this.form.controls.email.disable();
  }

  private obterMensagemErro(
    erro: string | null,
  ): string {
    switch (erro) {
      case 'EMAIL_DUPLICADO':
        return 'Já existe uma inscrição ativa com este e-mail.';

      case 'IDADE_MINIMA':
        return 'O participante deve ter pelo menos 14 anos na data da prova.';

      case 'DISTANCIA_NAO_PERMITIDA':
        return 'O percurso de 10 km é permitido somente para participantes com 18 anos ou mais.';

      case 'NAO_ENCONTRADA':
        return 'Inscrição não encontrada.';

      case 'ARMAZENAMENTO':
        return 'Não foi possível salvar a inscrição. Tente novamente.';

      default:
        return 'Não foi possível concluir a operação.';
    }
  }
}