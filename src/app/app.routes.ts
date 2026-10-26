import { Routes } from '@angular/router';
import { InscricaoDetalhes } from './inscricoes/pages/inscricao-detalhes/inscricao-detalhes.component';
import { InscricaoForm } from './inscricoes/pages/inscricao-form/inscricao-form.component';
import { InscricoesLista } from './inscricoes/pages/inscricoes-lista/inscricoes-lista.component';
import { NotFound } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inscricoes',
    pathMatch: 'full',
  },
  {
    path: 'inscricoes',
    component: InscricoesLista,
  },
  {
    path: 'inscricoes/nova',
    component: InscricaoForm,
  },
  {
    path: 'inscricoes/:email/editar',
    component: InscricaoForm,
  },
  {
    path: 'inscricoes/:email',
    component: InscricaoDetalhes,
  },
  {
    path: '**',
    component: NotFound,
  },
];