# PIM - Gestao de Tarefas

Sistema web simples para gerenciar colaboradores e tarefas. O projeto usa um backend em Node.js/Express e salva os dados em arquivos JSON.

## Requisitos

Antes de rodar o projeto, instale:

- Node.js
- npm
- DBeaver, caso queira abrir o banco SQLite `pim.db`

Para verificar se ja estao instalados:

```bash
node -v
npm -v
```

## Como Rodar

1. Abra o terminal na pasta do projeto:

2. Instale as dependencias:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Acesse o sistema no navegador:

```text
http://localhost:3000
```

O servidor redireciona automaticamente para a tela de colaboradores.

## Como Abrir o Banco `pim.db` no DBeaver

O arquivo `pim.db` fica na raiz do projeto e e um banco de dados SQLite. O gerenciador usado para visualizar o banco foi o DBeaver.

1. Abra o DBeaver.
2. Clique em `Nova Conexao`.
3. Escolha a opcao `SQLite`.
4. No campo do arquivo do banco de dados, selecione o arquivo:

```text
pim.db
```

5. Confirme a conexao e clique em `Finish`.
6. Depois de conectar, abra a conexao no painel lateral para visualizar as tabelas e os dados.

Caso o DBeaver solicite o driver do SQLite, confirme o download/instalacao pelo proprio DBeaver.

## Telas

- Colaboradores:

```text
http://localhost:3000/pages/colaboradores.html
```

- Tarefas:

```text
http://localhost:3000/pages/tarefas.html
```

## Onde os Dados Sao Salvos

Os dados ficam em arquivos JSON dentro da pasta `data`:

```text
data/colaboradores.json
data/tarefas.json
```

Quando voce cria, edita ou exclui colaboradores/tarefas pela tela, o backend atualiza esses arquivos automaticamente.

## Estrutura Principal

```text
backend/
  server.js
  controllers/
  routes/
  services/
  models/
  dtos/

frontend/
  pages/
  js/

data/
  colaboradores.json
  tarefas.json
```

## Observacoes Importantes

- Sempre acesse o projeto pelo endereco `http://localhost:3000`.
- Nao abra os arquivos HTML diretamente no navegador, porque assim o backend nao sera usado.
- Se alterar arquivos do backend, pare o servidor e rode `npm start` novamente.

## Como Parar o Servidor

No terminal onde o servidor esta rodando, pressione:

```text
Ctrl + C
```
