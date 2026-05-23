# PIM - Gestao de Tarefas

Sistema web simples para gerenciar colaboradores e tarefas. O projeto usa um backend em Node.js/Express e salva os dados em arquivos JSON.

## Requisitos

Antes de rodar o projeto, instale:

- Node.js
- npm

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
