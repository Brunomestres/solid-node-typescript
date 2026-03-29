# 03 API SOLID

API em Node.js inspirada no desafio do GymPass, construída com foco em separação de responsabilidades, casos de uso e persistência com Prisma.

No estado atual do projeto, o fluxo implementado é o cadastro de usuários com:

- validação de entrada com `zod`
- hash de senha com `bcryptjs`
- persistência em PostgreSQL com `Prisma`
- teste unitário do caso de uso com `Vitest`

## Stack

- `Node.js`
- `TypeScript`
- `Fastify`
- `Prisma ORM`
- `PostgreSQL`
- `Docker Compose`
- `Vitest`
- `Zod`

## Funcionalidades

### Implementadas

- cadastro de usuário via `POST /users`
- bloqueio de e-mail duplicado
- criptografia de senha antes de salvar
- tratamento de erro de validação

### Planejadas

- autenticação
- perfil do usuário
- histórico e contagem de check-ins
- busca de academias
- criação e validação de check-ins
- cadastro de academias

## Regras de negócio mapeadas

- um usuário não pode se cadastrar com e-mail duplicado
- a senha do usuário deve ser armazenada criptografada
- os dados devem ser persistidos em PostgreSQL

## Estrutura do projeto

```text
src/
  env/
  http/
    controllers/
    routes.ts
  lib/
  repositories/
    prisma/
  use-cases/
prisma/
  migrations/
  schema.prisma
```

## Padrão usado

O projeto está organizado em camadas para manter a regra de negócio desacoplada da entrega HTTP e da infraestrutura:

- `controllers` recebem e validam a requisição
- `use-cases` concentram a regra de negócio
- `repositories` abstraem acesso a dados
- `prisma` implementa a persistência real no banco

## Pré-requisitos

- `Node.js` 18+
- `npm`
- `Docker` e `Docker Compose`

## Configuração

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
NODE_ENV=dev
PORT=3333
DATABASE_URL="postgresql://docker:docker@localhost:5432/ignitenode03?schema=public"
```

### 3. Suba o banco com Docker

```bash
docker-compose up -d
```

Serviços disponíveis:

- PostgreSQL: `localhost:5432`
- pgAdmin: `http://localhost:5050`

Credenciais do `pgAdmin`:

- e-mail: `admin@admin.com`
- senha: `admin`

### 4. Rode as migrations

```bash
npx prisma migrate dev
```

Se necessário, gere o client do Prisma:

```bash
npx prisma generate
```

## Executando o projeto

### Ambiente de desenvolvimento

```bash
npm run start:dev
```

API disponível em:

```text
http://localhost:3333
```

### Build de produção

```bash
npm run build
npm start
```

## Testes

Para executar os testes:

```bash
npm test
```

Para rodar em modo watch:

```bash
npm run test:watch
```

## Endpoint disponível

### `POST /users`

Cria um novo usuário.

Body:

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```

Respostas esperadas:

- `201 Created` em caso de sucesso
- `400 Bad Request` para payload inválido
- `409 Conflict` quando o e-mail já existir

## Banco de dados

O schema atual possui as entidades:

- `users`
- `gyms`
- `check_ins`

Mesmo que nem todas as rotas já estejam implementadas, a modelagem base do domínio já existe em [`prisma/schema.prisma`](./prisma/schema.prisma).

## Coleções para API

O repositório já inclui arquivos para testes manuais de requisição:

- `Postman.json`
- `Insomnia.json`

## Scripts disponíveis

- `npm run start:dev` inicia a API em modo desenvolvimento com `tsx watch`
- `npm run build` gera a pasta `build`
- `npm start` executa a versão compilada
- `npm test` roda os testes uma vez
- `npm run test:watch` roda os testes em modo observação
