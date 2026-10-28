# Corrida Solidária

Aplicação web desenvolvida em Angular para gerenciamento das inscrições da 5ª Corrida Solidária Vila Esperança.

**Aplicação publicada:** https://corrida-memora.vercel.app

## Como rodar

### Requisitos

- Node.js 22
- npm

Clone o repositório:

```bash
git clone https://github.com/branchescunha/corrida.git
cd corrida
```

Instale as dependências.

Opção recomendada, utilizando exatamente as versões do `package-lock.json`:

```bash
npm ci
```

Ou, alternativamente:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

Para executar os testes em modo contínuo:

```bash
npm test
```

Para executar os testes uma única vez:

```bash
npx ng test --watch=false
```

Para gerar o build de produção:

```bash
npm run build
```

## Entendimento do problema

A aplicação gerencia as inscrições da Corrida Solidária, mantendo nome, e-mail, nascimento e percurso de cada participante. As regras de idade, categoria e percurso são calculadas conforme a data oficial da prova. O sistema permite cadastrar, consultar, editar e cancelar inscrições, mantendo os dados persistidos localmente no navegador.

## Regras implementadas

| Regra | Fonte | Implementação |
| --- | --- | --- |
| Idade mínima de 14 anos | Regulamento / enunciado | Regras de domínio |
| Juvenil: 14–17 anos | Regulamento | Regras de domínio |
| Adulto: 18–39 anos | Regulamento | Regras de domínio |
| Master: 40–59 anos | Regulamento | Regras de domínio |
| Sênior: 60 anos ou mais | Regulamento | Regras de domínio |
| 5 km permitido a partir de 14 anos | Regulamento | Regras de domínio |
| 10 km permitido a partir de 18 anos | Regulamento | Regras de domínio |
| Idade calculada na data da prova | Regulamento | Regras de domínio |
| Um e-mail por inscrição ativa | Enunciado | Serviço de inscrições |
| E-mail normalizado e imutável na edição | Enunciado | Serviço, validação e formulário |
| Nome, nascimento e percurso editáveis | Enunciado | Formulário e serviço |
| Data armazenada como `aaaa-mm-dd` e exibida como `dd/mm/aaaa` | Enunciado | Utilitário de formatação |
| Cancelamento remove a inscrição e libera o e-mail | Enunciado | Serviço de inscrições |
| Dados persistidos em `localStorage` | Enunciado | Serviço de inscrições |
| Totais geral, 5 km e 10 km calculados a partir das inscrições | Enunciado | Serviço de inscrições |

A chave utilizada no `localStorage` é:

```text
corrida.inscricoes.v1
```

## Conflitos encontrados e decisões

### Data da prova

Um dos materiais mencionava `13/03/2027`, enquanto o regulamento oficial informa `14/03/2027`.

Foi adotada a data do regulamento oficial:

```text
14/03/2027
```

### Cálculo da categoria

Em uma conversa da organização foi mencionada classificação pelo ano de nascimento.

Como o regulamento define faixas por idade, a aplicação utiliza a **idade completa na data da prova**, considerando dia, mês e ano.

### Uso do mesmo e-mail por familiares

Foi mencionada a possibilidade de utilizar o mesmo e-mail para mais de um participante.

O enunciado define o e-mail como identificador da inscrição. Por isso, foi mantida a regra de **uma inscrição ativa por e-mail**.

### Endereços Gmail com pontos

Foi levantada a dúvida sobre endereços como:

```text
joao.silva@gmail.com
joaosilva@gmail.com
```

A equivalência entre esses endereços é uma regra específica do provedor e não foi definida como regra do sistema. A aplicação normaliza apenas espaços e letras maiúsculas/minúsculas.

### Divulgação em 01/11

Foi mencionada a divulgação do link em `01/11`, mas não foi definida uma janela oficial para abertura ou encerramento das inscrições.

Por isso, não foi implementado bloqueio de cadastro ou cancelamento baseado em data.

## Perguntas que eu faria ao cliente

- Quando houver conflito entre materiais, qual documento deve ter prioridade?
- O mesmo e-mail poderá identificar mais de um participante em algum cenário?
- Endereços considerados equivalentes por determinados provedores devem ser tratados como o mesmo e-mail?
- Existe uma data oficial para abertura ou encerramento das inscrições?

Enquanto essas respostas não existem, foram utilizadas as regras formais do regulamento e do enunciado técnico.

## Fora de escopo

Não foram implementados:

- autenticação ou login;
- backend ou banco de dados remoto;
- sincronização entre diferentes abas ou dispositivos;
- bloqueio das inscrições por período;
- regras específicas de equivalência de e-mails de provedores.

Esses comportamentos não foram exigidos para esta entrega.

## Estrutura do projeto

```text
src/
└── app/
    ├── config/
    ├── dominio/
    ├── inscricoes/
    │   ├── components/
    │   │   ├── evento-header/
    │   │   └── inscricao-card/
    │   ├── models/
    │   ├── pages/
    │   │   ├── inscricao-detalhes/
    │   │   ├── inscricao-form/
    │   │   └── inscricoes-lista/
    │   ├── services/
    │   └── validators/
    ├── pages/
    │   └── not-found/
    └── shared/
        ├── confirmacao-modal/
        ├── loading/
        ├── theme/
        ├── theme-toggle/
        └── utils/
```

## Verificações realizadas

Foram verificados os principais fluxos e casos-limite da aplicação, incluindo:

- cadastro, consulta, edição e cancelamento;
- idade mínima e fronteiras das categorias;
- percurso de 10 km para menores de 18 anos;
- aniversário antes, no dia e depois da data da prova;
- e-mails duplicados com diferenças de espaços e maiúsculas/minúsculas;
- edição recusada sem alterar os dados anteriores;
- atualização dos totais ao alterar o percurso;
- persistência e recuperação pelo `localStorage`;
- tratamento de dados armazenados inválidos;
- rotas de detalhes, edição e página não encontrada;
- tema claro e escuro com persistência;
- funcionamento responsivo em desktop e mobile.

Resultado da validação automatizada:

```text
4 arquivos de teste aprovados
30 testes aprovados
Build de produção concluído com sucesso
```

## Autor

André Vinícius Branches Cunha
