# Todo List

## Visão Geral do Projeto

Este projeto é uma **API Backend** para gerenciamento de **listas de tarefas** (**Todo List**). Ele permite que **usuários** criem, atualizem e deletem suas listas de tarefas e tarefas associadas. Também conta com uma **autenticação** baseada em JWT e **roles de usuário**, diferenciando entre **clientes** e **administradores**. Administradores têm permissões extras, como visualizar todos os dados da aplicação.

### Tecnologias Utilizadas

- **Node.js** com **Express** para criação do servidor e rotas.
- **PostgreSQL** como banco de dados relacional.
- **Sequelize** como ORM para interagir com o banco de dados.
- **JWT** (JSON Web Token) para autenticação.
- **Swagger** para documentação das APIs.
- **Jest** para testes unitários.

---

## Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/devleo-m/todo-list.git
   
2. Instale as dependências:
   ```bash
   npm install

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```bash
     PORT=3000
   
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=root
     DB_NAME=db-todo
   
     POSTGRES_USER=root
     POSTGRES_PASSWORD=root
     POSTGRES_DB=db-todo
     POSTGRES_PORT=5434
   
     JWT_SECRET=sua_chave_secreta

4. Rode o `docker-compose`
   ```bash
   docker-compose up -d

5. Crie as roles `admin` e `cliente`:
   ```bash
   ts-node src/scripts/createRoles.ts

6. Crie o administrador:
   ```bash
   ts-node src/scripts/createUserAdmin.ts

5. Inicie o servidor:
   ```bash
   npm start

6. Acesse a documentação da API (via Swagger) no seguinte endereço:
   http://localhost:3000/api-docs

---

## Funcionalidades

### 1. **Autenticação e Autorização**
   - Autenticação via **JWT**: O usuário deve estar autenticado para acessar as rotas da API.
   - Diferenciação de **roles**: 
     - **Clientes** podem gerenciar suas próprias listas e tarefas.
     - **Administradores** podem visualizar e gerenciar os dados de todos os usuários.

### 2. **Gerenciamento de Listas e Tarefas**
   - **Listas**:
     - Criar uma nova lista.
     - Atualizar o nome de uma lista.
     - Deletar uma lista.
     - Listar todas as listas do usuário autenticado.
   - **Tarefas**:
     - Criar uma tarefa em uma lista específica.
     - Atualizar o status de uma tarefa (concluída ou não).
     - Deletar uma tarefa.

### 3. **Administração**
   - **Admin** pode:
     - Visualizar todos os usuários.
     - Gerenciar usuários (criar, atualizar e deletar).

---

## Endpoints da API

Aqui estão os principais endpoints disponíveis na API. Para ver a lista completa e detalhes de cada endpoint, consulte a [Documentação do Swagger](http://localhost:3000/api-docs).

### Autenticação

- **POST** `/auth/login`: Faz login na aplicação e retorna o token JWT.
- **POST** `/auth/registrar`: Cadastra um novo usuário.

### Listas

- **GET** `/api/listas/usuario`: Retorna todas as listas do usuário autenticado.
- **POST** `/api/listas`: Cria uma nova lista.
- **PUT** `/api/listas/:id`: Atualiza o nome de uma lista existente.
- **DELETE** `/api/listas/:id`: Deleta uma lista.

### Tarefas

- **GET** `/api/tarefas/lista/:listaId`: Retorna todas as tarefas de uma lista do usuário autenticado.
- **POST** `api/tarefas`: Cria uma nova tarefa em uma lista.
- **PUT** `/api/tarefas/:id`: Atualiza o status de uma tarefa.
- **DELETE** `/api/tarefas/:id/lista/:listaId`: Deleta uma tarefa.

---

## Documentação da API

A documentação completa da API foi feita com **Swagger** e pode ser acessada pelo link abaixo após iniciar a aplicação:

http://localhost:3000/api-docs

---

## Testes

O projeto inclui testes unitários para garantir a estabilidade do código.

Para rodar os testes, use o seguinte comando:

    npm test
