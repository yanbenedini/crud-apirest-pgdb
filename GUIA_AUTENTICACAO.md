# 🔐 Guia de Autenticação JWT

Este guia explica como configurar e usar a autenticação JWT na API de Controle de Estoque.

## 📋 Configuração Inicial

### 1. Configurar Variável de Ambiente

Crie um arquivo `.env` na raiz do projeto (se ainda não existir) e adicione:

```env
JWT_SECRET=sua-chave-secreta-super-segura-aqui
```

**⚠️ IMPORTANTE:**
- Use uma chave secreta forte e única em produção
- Nunca compartilhe ou commite o arquivo `.env` no Git
- Gere uma chave aleatória segura (pode usar: `openssl rand -base64 32`)

### 2. Exemplo de `.env` Completo

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco

# Servidor
PORT=3000

# JWT Secret (OBRIGATÓRIO)
JWT_SECRET=minha-chave-secreta-super-segura-123456789
```

## 🚀 Como Funciona

### Fluxo de Autenticação

1. **Cadastro de Usuário** → Cria um novo usuário (público)
2. **Login** → Retorna um token JWT (público)
3. **Acessar Rotas Protegidas** → Envia o token no header (protegido)

## 📝 Como Usar a API

### 1. Cadastrar um Usuário

**Endpoint:** `POST /api/usuarios/cadastro`

**Request:**
```bash
curl -X POST http://localhost:3000/api/usuarios/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

**Response:**
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Fazer Login

**Endpoint:** `POST /api/usuarios/login`

**Request:**
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

**Response:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9hb0BleGFtcGxlLmNvbSIsImlhdCI6MTcwNDA2NDAwMCwiZXhwIjoxNzA0MTUwNDAwfQ.abc123...",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

**💡 Guarde o token retornado! Você precisará dele para acessar rotas protegidas.**

### 3. Acessar Rotas Protegidas

Para acessar qualquer rota protegida, você precisa enviar o token no header `Authorization` com o formato `Bearer <token>`.

**Exemplo: Listar Produtos**

```bash
curl -X GET http://localhost:3000/api/produtos \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Exemplo: Criar Fornecedor**

```bash
curl -X POST http://localhost:3000/api/fornecedores \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fornecedor ABC",
    "cnpj": "12.345.678/0001-90",
    "email": "contato@fornecedor.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Exemplo, 123"
  }'
```

## 🔒 Rotas Protegidas vs Públicas

### ✅ Rotas Públicas (não precisam de token)
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Fazer login
- `GET /` - Informações da API

### 🔐 Rotas Protegidas (precisam de token)
- **Usuários:**
  - `GET /api/usuarios` - Listar todos os usuários
  - `GET /api/usuarios/:id` - Buscar usuário por ID
  - `PUT /api/usuarios/:id` - Atualizar usuário
  - `DELETE /api/usuarios/:id` - Deletar usuário

- **Fornecedores:**
  - Todas as rotas (`GET`, `POST`, `PUT`, `DELETE`)

- **Produtos:**
  - Todas as rotas (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)

## 📱 Exemplos com Ferramentas

### Postman

1. **Fazer Login:**
   - Método: `POST`
   - URL: `http://localhost:3000/api/usuarios/login`
   - Body (raw JSON):
     ```json
     {
       "email": "joao@example.com",
       "senha": "senha123"
     }
     ```
   - Copie o `token` da resposta

2. **Acessar Rota Protegida:**
   - Método: `GET`
   - URL: `http://localhost:3000/api/produtos`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <cole-o-token-aqui>`

### JavaScript/Fetch

```javascript
// 1. Fazer login
const loginResponse = await fetch('http://localhost:3000/api/usuarios/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'joao@example.com',
    senha: 'senha123'
  })
});

const { token } = await loginResponse.json();

// 2. Usar o token para acessar rotas protegidas
const produtosResponse = await fetch('http://localhost:3000/api/produtos', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const produtos = await produtosResponse.json();
console.log(produtos);
```

### Axios

```javascript
import axios from 'axios';

// 1. Fazer login
const loginResponse = await axios.post('http://localhost:3000/api/usuarios/login', {
  email: 'joao@example.com',
  senha: 'senha123'
});

const { token } = loginResponse.data;

// 2. Configurar axios para usar o token em todas as requisições
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// 3. Fazer requisições protegidas
const produtosResponse = await axios.get('http://localhost:3000/api/produtos');
console.log(produtosResponse.data);
```

## ⚙️ Configurações do Token

O token JWT está configurado com:

- **Expiração:** 24 horas (`expiresIn: '24h'`)
- **Payload:** Contém `userId` e `email`
- **Algoritmo:** HS256 (padrão)

### Alterar Tempo de Expiração

Para alterar o tempo de expiração, edite `src/controllers/user.controller.ts`:

```typescript
const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' } // Exemplo: 7 dias
);
```

Opções de tempo:
- `'15m'` - 15 minutos
- `'1h'` - 1 hora
- `'24h'` - 24 horas
- `'7d'` - 7 dias
- `'30d'` - 30 dias

## 🛡️ Segurança

### Boas Práticas

1. **Nunca exponha o JWT_SECRET** no código ou repositório
2. **Use HTTPS** em produção
3. **Armazene tokens com segurança** no frontend (localStorage, sessionStorage, ou cookies httpOnly)
4. **Implemente refresh tokens** para produção (tokens de longa duração)
5. **Valide tokens** em todas as rotas protegidas (já implementado)

### Respostas de Erro

**Token ausente:**
```json
{
  "error": "Token de acesso requerido"
}
```
Status: `401 Unauthorized`

**Token inválido/expirado:**
```json
{
  "error": "Token inválido ou expirado"
}
```
Status: `403 Forbidden`

## 🔍 Verificar Token (Debug)

Você pode decodificar um token JWT (sem verificar a assinatura) em:
- https://jwt.io
- Isso é útil para debug, mas não valida a assinatura

## 📚 Estrutura do Token

O token JWT contém:

**Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "userId": 1,
  "email": "joao@example.com",
  "iat": 1704064000,
  "exp": 1704150400
}
```

## ✅ Teste Rápido

1. Cadastre um usuário:
```bash
POST /api/usuarios/cadastro
```

2. Faça login:
```bash
POST /api/usuarios/login
```

3. Use o token para acessar produtos:
```bash
GET /api/produtos
Header: Authorization: Bearer <token>
```

Pronto! Sua autenticação JWT está configurada e funcionando! 🎉

