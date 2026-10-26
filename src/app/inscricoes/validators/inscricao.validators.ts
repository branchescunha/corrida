import { AbstractControl, ValidationErrors } from '@angular/forms';

import { normalizarEmail } from '../../dominio/inscricao.regras';

export function nomeValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const nome = String(control.value ?? '')
    .trim()
    .replace(/\s+/g, ' ');

  if (!nome) {
    return null;
  }

  if (nome.length < 3 || nome.length > 100) {
    return { nomeInvalido: true };
  }

  return null;
}

export function emailValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const email = normalizarEmail(String(control.value ?? ''));

  if (!email) {
    return null;
  }

  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return formatoValido ? null : { emailInvalido: true };
}

export function nascimentoValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const nascimento = String(control.value ?? '');

  if (!nascimento) {
    return null;
  }

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  const dataHoje = `${ano}-${mes}-${dia}`;

  return nascimento < dataHoje
    ? null
    : { nascimentoInvalido: true };
}