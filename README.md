# API de Controle de Estoque

API RESTful desenvolvida em Node.js, TypeScript e PostgreSQL para gerenciamento de estoque, produtos, fornecedores e usuários.

## 🚀 Funcionalidades

- **Autenticação JWT**: Sistema de autenticação com tokens JWT
- **Criptografia de Senhas**: Senhas criptografadas usando bcrypt
- **CRUD Completo**:
  - Usuários (cadastro, login, gerenciamento)
  - Fornecedores (cadastro e gerenciamento)
  - Produtos (cadastro, atualização, remoção, controle de estoque)

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd crud-apirest-pgdb
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
PORT=3000
JWT_SECRET=seu-secret-key-aqui-mude-em-producao
```

4. Crie o banco de dados PostgreSQL:
```sql
CREATE DATABASE nome_do_banco;
```

5. Execute o servidor em modo desenvolvimento:
```bash
npm run dev
```

As tabelas serão criadas automaticamente na primeira execução.

## 📚 Endpoints da API

### Usuários

- `POST /api/usuarios/cadastro` - Cadastrar novo usuário
- `POST /api/usuarios/login` - Login (retorna token JWT)
- `GET /api/usuarios` - Listar todos os usuários (requer autenticação)
- `GET /api/usuarios/:id` - Buscar usuário por ID (requer autenticação)
- `PUT /api/usuarios/:id` - Atualizar usuário (requer autenticação)
- `DELETE /api/usuarios/:id` - Deletar usuário (requer autenticação)

### Fornecedores

- `POST /api/fornecedores` - Criar fornecedor (requer autenticação)
- `GET /api/fornecedores` - Listar todos os fornecedores (requer autenticação)
- `GET /api/fornecedores/:id` - Buscar fornecedor por ID (requer autenticação)
- `PUT /api/fornecedores/:id` - Atualizar fornecedor (requer autenticação)
- `DELETE /api/fornecedores/:id` - Deletar fornecedor (requer autenticação)

### Produtos

- `POST /api/produtos` - Criar produto (requer autenticação)
- `GET /api/produtos` - Listar todos os produtos (requer autenticação)
  - Query params: `?categoria=nome_da_categoria` - Filtrar por categoria
- `GET /api/produtos/:id` - Buscar produto por ID (requer autenticação)
- `PUT /api/produtos/:id` - Atualizar produto (requer autenticação)
- `DELETE /api/produtos/:id` - Deletar produto (requer autenticação)
- `PATCH /api/produtos/:id/quantidade` - Atualizar quantidade do produto (requer autenticação)
  - Body: `{ "quantidade": 10, "operacao": "adicionar" | "remover" }` ou `{ "quantidade": 10 }`

## 🔐 Autenticação

Para acessar rotas protegidas, envie o token JWT no header:

```
Authorization: Bearer <seu_token>
```

O token é obtido ao fazer login em `/api/usuarios/login`.

## 📝 Exemplos de Requisições

### Cadastro de Usuário
```bash
POST /api/usuarios/cadastro
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

### Login
```bash
POST /api/usuarios/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

### Criar Produto
```bash
POST /api/produtos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Notebook",
  "descricao": "Notebook Dell Inspiron 15",
  "preco": 3500.00,
  "quantidade": 10,
  "categoria": "Eletrônicos",      # Obrigatório
  "fornecedor_id": 1                # Obrigatório
}
```

**Campos obrigatórios:** `nome`, `preco`, `quantidade`, `categoria`, `fornecedor_id`

### Atualizar Quantidade de Produto
```bash
PATCH /api/produtos/1/quantidade
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantidade": 5,
  "operacao": "adicionar"
}
```

## 🗄️ Estrutura do Banco de Dados

O banco de dados possui as seguintes tabelas:

- **usuarios**: Armazena informações dos usuários (senha criptografada)
- **fornecedores**: Armazena informações dos fornecedores
- **produtos**: Armazena informações dos produtos com relação ao fornecedor

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm run build` - Compila o TypeScript para JavaScript
- `npm run test` - Executa os testes do jest

## 📦 Dependências Principais

- Express - Framework web
- PostgreSQL (pg) - Cliente PostgreSQL
- bcrypt - Criptografia de senhas
- jsonwebtoken - Autenticação JWT
- cors - CORS middleware
- dotenv - Gerenciamento de variáveis de ambiente

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt antes de serem armazenadas
- Autenticação JWT para proteger rotas sensíveis
- Validação de dados de entrada
- Sanitização de inputs para prevenir SQL injection (usando prepared statements)

## 📄 Licença

ISC

