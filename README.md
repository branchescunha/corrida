# Corrida Solidária

Aplicação web desenvolvida em Angular para gerenciamento das inscrições da 5ª Corrida Solidária Vila Esperança.

O sistema permite cadastrar, consultar, editar e cancelar inscrições, aplicando automaticamente as regras definidas para o evento e mantendo os dados persistidos localmente no navegador.

**Aplicação publicada:** https://corrida-memora.vercel.app

## Entendimento do problema

A aplicação deve gerenciar as inscrições da Corrida Solidária de forma simples e segura. Cada participante possui uma inscrição identificada pelo e-mail, com nome, nascimento e percurso. As regras de idade, categoria e distância precisam ser validadas conforme a data oficial da prova. Também é necessário permitir consulta, edição e cancelamento das inscrições.

## Funcionalidades

- Cadastro de participantes
- Listagem das inscrições
- Consulta individual por URL
- Edição de nome, data de nascimento e percurso
- Cancelamento com confirmação
- Identificação da inscrição pelo e-mail
- Bloqueio de alteração do e-mail durante a edição
- Validação de e-mail duplicado
- Cálculo da idade na data da prova
- Classificação automática por categoria
- Validação do percurso conforme a idade
- Resumo com total de participantes por percurso
- Filtros para todos, 5 km e 10 km
- Persistência das inscrições no navegador
- Tema claro e escuro
- Persistência da preferência de tema
- Interface responsiva
- Tratamento de inscrição inexistente
- Página 404 para rotas inválidas
- Tela de carregamento durante navegações
- Favicon personalizado

## Regras de negócio

A data oficial da prova é **14/03/2027**, às **7h**, na **Praça da Matriz**.

A idade considerada pelo sistema é a idade completa do participante na data da prova, e não a idade no momento da inscrição.

### Idade mínima

O participante deve possuir pelo menos **14 anos completos em 14/03/2027**.

### Categorias

| Categoria | Idade na data da prova |
| --- | --- |
| Juvenil | 14 a 17 anos |
| Adulto | 18 a 39 anos |
| Master | 40 a 59 anos |
| Sênior | 60 anos ou mais |

### Percursos

| Percurso | Regra |
| --- | --- |
| 5 km | Disponível para participantes a partir de 14 anos |
| 10 km | Disponível somente para participantes com 18 anos ou mais |

A idade mínima é validada antes da regra específica do percurso.

### E-mail

O e-mail funciona como identificador da inscrição.

Antes da comparação, o valor é normalizado com remoção de espaços nas extremidades e conversão para letras minúsculas.

Não é permitida mais de uma inscrição ativa com o mesmo e-mail normalizado.

O e-mail não pode ser alterado durante a edição. Para utilizar outro endereço, a inscrição atual deve ser cancelada e uma nova inscrição deve ser realizada.

Após um cancelamento, o e-mail fica disponível novamente para cadastro.

Não são aplicadas regras específicas de provedores, como considerar `joao.silva@gmail.com` e `joaosilva@gmail.com` automaticamente como o mesmo endereço.

## Persistência

Como o projeto não possui back-end ou banco de dados, as inscrições são armazenadas no `localStorage` do navegador.

A chave utilizada é:

```text
corrida.inscricoes.v1
```

Somente os dados necessários da inscrição são persistidos. Informações derivadas, como idade, categoria e totais, são recalculadas pela aplicação.

A aplicação inicia sem inscrições quando não existem dados armazenados.

Dados inválidos ou problemas de leitura e gravação do armazenamento são tratados pela aplicação sem interromper a interface.

A preferência entre tema claro e escuro também é armazenada localmente.

## Edição e cancelamento

Na edição podem ser alterados:

- nome;
- data de nascimento;
- percurso.

O e-mail permanece bloqueado porque identifica a inscrição.

As regras de negócio são novamente validadas antes de salvar uma alteração. Caso os novos dados sejam inválidos, a inscrição anterior é preservada.

O cancelamento exige confirmação antes da exclusão. Depois de confirmado, a inscrição é removida do armazenamento, os totais são atualizados e o e-mail pode ser utilizado novamente.

## Filtros

A listagem possui filtros para facilitar a consulta dos participantes:

- Todos;
- 5 km;
- 10 km.

Os números apresentados nos filtros e no cabeçalho são derivados das inscrições armazenadas e atualizados automaticamente após cadastros, edições e cancelamentos.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Redireciona para a lista de inscrições |
| `/inscricoes` | Lista de inscrições |
| `/inscricoes/nova` | Nova inscrição |
| `/inscricoes/:email` | Consulta individual |
| `/inscricoes/:email/editar` | Edição da inscrição |
| qualquer outra rota | Página 404 |

Os parâmetros de e-mail são tratados pela navegação da aplicação, incluindo endereços que possuam caracteres como `+` e `@`.

A configuração de rewrite para a Vercel permite acessar ou atualizar diretamente as rotas da aplicação sem retornar erro do servidor.

## Responsividade e temas

A interface foi desenvolvida para funcionar em desktop, tablet e dispositivos móveis.

O tema claro é utilizado como padrão inicial. O usuário pode alternar entre tema claro e escuro pelo botão disponível no cabeçalho.

Após uma escolha, a preferência é armazenada no navegador e recuperada nos próximos acessos.

Os dois temas utilizam os mesmos componentes e regras de responsividade.

## Tecnologias utilizadas

- Angular 21
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Reactive Forms
- Signals
- Vitest
- localStorage
- Git e GitHub
- Vercel

## Estrutura do projeto

```text
corrida/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── config/
│   │   │   └── corrida.config.ts
│   │   ├── dominio/
│   │   │   ├── inscricao.regras.spec.ts
│   │   │   └── inscricao.regras.ts
│   │   ├── inscricoes/
│   │   │   ├── components/
│   │   │   │   ├── evento-header/
│   │   │   │   └── inscricao-card/
│   │   │   ├── models/
│   │   │   ├── pages/
│   │   │   │   ├── inscricao-detalhes/
│   │   │   │   ├── inscricao-form/
│   │   │   │   └── inscricoes-lista/
│   │   │   ├── services/
│   │   │   └── validators/
│   │   ├── pages/
│   │   │   └── not-found/
│   │   ├── shared/
│   │   │   ├── confirmacao-modal/
│   │   │   ├── loading/
│   │   │   ├── theme/
│   │   │   ├── theme-toggle/
│   │   │   └── utils/
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── vercel.json
└── README.md
```

## Como executar

É necessário possuir Node.js e npm instalados.

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

Depois, acesse:

```text
http://localhost:4200
```

## Testes

Os testes automatizados cobrem regras de negócio, armazenamento e operações das inscrições, comportamento do tema e inicialização da aplicação.

Entre os cenários verificados estão:

- idade mínima;
- limites das categorias;
- restrição do percurso de 10 km;
- cadastro de inscrições;
- bloqueio de e-mail duplicado;
- atualização de inscrições;
- cancelamento;
- persistência no `localStorage`;
- recuperação dos dados armazenados;
- tratamento de dados inválidos;
- tema padrão;
- alteração e persistência de tema.

Para executar todos os testes:

```bash
npm test -- --watch=false
```

Na validação final do projeto:

```text
4 arquivos de teste aprovados
30 testes aprovados
```

Para validar o build de produção:

```bash
npm run build
```

## Fontes e critérios adotados

As regras foram definidas a partir do enunciado técnico, do pacote fornecido pelo cliente e do regulamento da corrida.

Quando diferentes materiais apresentaram informações incompatíveis, foi utilizada como prioridade a regra mais formal e específica para aquele assunto, principalmente o regulamento oficial do evento e os requisitos expressos do enunciado técnico.

## Conflitos encontrados e decisões

### Data da prova

Um dos materiais mencionava **13/03/2027**, enquanto o regulamento oficial informa **14/03/2027**.

Foi adotada a data do regulamento:

```text
14/03/2027
```

### Cálculo da categoria

Em uma conversa da organização foi mencionada a classificação somente pelo ano de nascimento.

O regulamento, porém, define as faixas pela idade do participante. Por isso, a aplicação calcula a **idade completa na data da prova**, considerando dia, mês e ano, e utiliza essa idade para determinar a categoria.

### Uso do mesmo e-mail por familiares

Foi mencionada a possibilidade de uma responsável cadastrar mais de um participante utilizando o próprio e-mail.

Essa possibilidade conflita com a regra técnica de que o e-mail identifica uma inscrição ativa. Portanto, foi mantida a regra de **uma inscrição ativa por e-mail**.

### Endereços Gmail com pontos

Também surgiu a dúvida sobre endereços como:

```text
joao.silva@gmail.com
joaosilva@gmail.com
```

Embora um provedor possa entregar mensagens desses endereços à mesma conta, essa equivalência não foi definida como regra do sistema.

A aplicação normaliza apenas espaços e letras maiúsculas/minúsculas, mantendo os dois valores como identificadores diferentes.

### Divulgação em 01/11

Foi mencionada a divulgação do link em **01/11**, mas não foi definida formalmente uma janela de abertura ou encerramento das inscrições.

Por isso, não foi implementado bloqueio de cadastro ou cancelamento baseado em data.

## Perguntas consideradas

Durante a análise foram consideradas principalmente as seguintes dúvidas:

- Qual material deveria prevalecer quando duas informações fossem diferentes?
- A categoria deveria considerar apenas o ano de nascimento ou a idade completa?
- Mais de um participante poderia utilizar o mesmo e-mail?
- Endereços equivalentes segundo regras particulares de um provedor deveriam ser tratados como duplicados?
- A data mencionada para divulgação representava também uma data formal de abertura das inscrições?

As decisões adotadas estão registradas na seção anterior para tornar o comportamento da aplicação explícito e verificável.

## Fora de escopo

Não foram implementados recursos que não fazem parte dos requisitos fornecidos, como:

- autenticação ou login;
- pagamento;
- envio de e-mails;
- banco de dados remoto;
- API própria;
- autorização ou níveis de usuário;
- bloqueio temporal de inscrições;
- bloqueio temporal de cancelamentos.

## Verificação final

O projeto foi validado com:

```bash
npm test -- --watch=false
npm run build
```

Resultado final:

```text
30 testes automatizados aprovados
Build de produção concluído com sucesso
```

A aplicação também foi verificada manualmente nos principais fluxos de cadastro, consulta, edição, cancelamento, filtros, navegação, persistência, responsividade e troca de tema.

## Deploy

A aplicação está publicada na Vercel:

https://corrida-memora.vercel.app

## Autor

André Vinícius Branches Cunha