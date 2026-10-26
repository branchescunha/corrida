# Corrida Solidária

Aplicação web desenvolvida em Angular para gerenciamento das inscrições da **5ª Corrida Solidária**.

O sistema permite cadastrar, consultar, editar e cancelar inscrições, aplicando automaticamente as regras definidas para o evento.

## Aplicação publicada

**Vercel:** https://corrida-memora.vercel.app

## Funcionalidades

- Cadastro de participantes
- Edição de inscrições
- Consulta da lista de inscritos
- Visualização dos detalhes de cada inscrição
- Cancelamento com confirmação
- Persistência das inscrições no navegador
- Bloqueio de e-mails duplicados
- Cálculo da idade do participante na data da prova
- Classificação automática por categoria
- Validação das distâncias permitidas
- Resumo das inscrições de 5 km e 10 km
- Tema claro e escuro
- Persistência da preferência de tema
- Página 404 personalizada
- Tela de carregamento
- Interface responsiva
- Navegação por rotas
- Testes automatizados

## Evento

**5ª Corrida Solidária — Vila Esperança**

- Data: 14/03/2027
- Horário: 7h
- Local: Praça da Matriz
- Percursos: 5 km e 10 km

## Categorias

A categoria é definida pela idade completa do participante na data da prova.

| Categoria | Idade |
| --- | --- |
| Juvenil | 14 a 17 anos |
| Adulto | 18 a 39 anos |
| Master | 40 a 59 anos |
| Sênior | 60 anos ou mais |

Participantes com menos de 14 anos não podem realizar a inscrição.

## Tecnologias

- Angular 21
- TypeScript
- HTML
- CSS
- Angular Router
- Vitest
- LocalStorage
- Vercel
- Git
- GitHub

## Estrutura do projeto

```txt
src/
├── app/
│   ├── dominio/
│   │   ├── inscricao.regras.spec.ts
│   │   └── inscricao.regras.ts
│   ├── inscricoes/
│   │   ├── components/
│   │   │   ├── evento-header/
│   │   │   └── inscricao-card/
│   │   ├── models/
│   │   ├── pages/
│   │   │   ├── inscricao-detalhes/
│   │   │   ├── inscricao-form/
│   │   │   └── inscricoes-lista/
│   │   ├── services/
│   │   └── validators/
│   ├── pages/
│   │   └── not-found/
│   ├── shared/
│   │   ├── confirmacao-modal/
│   │   ├── loading/
│   │   ├── theme/
│   │   ├── theme-toggle/
│   │   └── utils/
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.css
```

## Regras de negócio

As regras do regulamento foram isoladas da interface para facilitar manutenção e testes.

Entre as validações implementadas estão:

- idade mínima de 14 anos;
- cálculo da idade com base na data oficial da prova;
- classificação automática por faixa etária;
- validação das distâncias disponíveis;
- normalização de e-mail;
- prevenção de inscrições duplicadas.

## Persistência

As inscrições são armazenadas no `localStorage` do navegador.

Isso permite manter os dados após atualizar ou fechar a página, sem necessidade de uma API ou banco de dados externo.

O sistema também trata dados inválidos armazenados no navegador para evitar a quebra da aplicação.

## Testes

O projeto possui testes automatizados para as principais regras e comportamentos da aplicação, incluindo:

- regras de negócio;
- limites das categorias;
- idade mínima;
- persistência;
- cadastro;
- edição;
- cancelamento;
- e-mail duplicado;
- recuperação do `localStorage`;
- tema claro e escuro;
- inicialização da aplicação.

Os testes podem ser executados com:

```bash
npm test -- --watch=false
```

O build de produção pode ser validado com:

```bash
npm run build
```

## Rotas

| Rota | Descrição |
| --- | --- |
| `/inscricoes` | Lista de inscrições |
| `/inscricoes/nova` | Nova inscrição |
| `/inscricoes/:email` | Detalhes de uma inscrição |
| `/inscricoes/:email/editar` | Edição de inscrição |
| qualquer outra rota | Página 404 |

A aplicação também possui configuração de rewrite para que as rotas funcionem corretamente após o deploy na Vercel.

## Responsividade e temas

A interface foi desenvolvida para adaptação a diferentes tamanhos de tela.

O sistema disponibiliza:

- tema claro como padrão inicial;
- tema escuro opcional;
- preferência armazenada no navegador;
- funcionamento responsivo nos dois temas.

## Autor

André Vinícius Branches Cunha