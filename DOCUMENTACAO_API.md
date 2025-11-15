# 📚 Documentação Completa da API

**Base URL:** `http://localhost:3000/api`

---

## 🔐 Autenticação

Todas as rotas protegidas requerem um token JWT no header `Authorization`:

```
Authorization: Bearer <seu_token>
```

O token é obtido através do endpoint de login em `/api/usuarios/login`.

---

## 👥 Usuários

### 1. Cadastrar Usuário

**Endpoint:** `POST /api/usuarios/cadastro`  
**Autenticação:** ❌ Não requerida (público)

#### Headers
```
Content-Type: application/json
```

#### Body
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

#### Resposta de Sucesso (201 Created)
```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** Campos obrigatórios faltando ou email já cadastrado
- **500 Internal Server Error:** Erro ao criar usuário

---

### 2. Login

**Endpoint:** `POST /api/usuarios/login`  
**Autenticação:** ❌ Não requerida (público)

#### Headers
```
Content-Type: application/json
```

#### Body
```json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9hb0BleGFtcGxlLmNvbSIsImlhdCI6MTcwNDA2NDAwMCwiZXhwIjoxNzA0MTUwNDAwfQ.abc123...",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** Email e senha são obrigatórios
- **401 Unauthorized:** Credenciais inválidas
- **500 Internal Server Error:** Erro ao fazer login

---

### 3. Listar Todos os Usuários

**Endpoint:** `GET /api/usuarios`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@example.com",
    "created_at": "2024-01-16T14:20:00.000Z",
    "updated_at": "2024-01-16T14:20:00.000Z"
  }
]
```

#### Possíveis Erros
- **401 Unauthorized:** Token ausente ou inválido
- **500 Internal Server Error:** Erro ao buscar usuários

---

### 4. Buscar Usuário por ID

**Endpoint:** `GET /api/usuarios/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do usuário

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Usuário não encontrado
- **500 Internal Server Error:** Erro ao buscar usuário

---

### 5. Atualizar Usuário

**Endpoint:** `PUT /api/usuarios/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Parâmetros de URL
- `id` (obrigatório): ID do usuário

#### Body (atualização parcial - envie apenas os campos que deseja atualizar)
```json
{
  "nome": "João Silva Santos",
  "email": "joao.santos@example.com",
  "senha": "nova_senha_segura"
}
```

#### Exemplo: Atualizar apenas o nome
```json
{
  "nome": "João Silva Santos"
}
```

#### Exemplo: Atualizar apenas email e senha
```json
{
  "email": "joao.santos@example.com",
  "senha": "nova_senha_segura"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva Santos",
    "email": "joao.santos@example.com",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T11:45:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Usuário não encontrado
- **500 Internal Server Error:** Erro ao atualizar usuário

---

### 6. Deletar Usuário

**Endpoint:** `DELETE /api/usuarios/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do usuário

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Usuário deletado com sucesso"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Usuário não encontrado
- **500 Internal Server Error:** Erro ao deletar usuário

---

## 🏢 Fornecedores

### 1. Criar Fornecedor

**Endpoint:** `POST /api/fornecedores`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Body
```json
{
  "nome": "Fornecedor ABC Ltda",
  "cnpj": "12.345.678/0001-90",
  "email": "contato@fornecedorabc.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua Exemplo, 123 - São Paulo, SP"
}
```

**Campos obrigatórios:**
- `nome` (string)
- `cnpj` (string, único)

**Campos opcionais:**
- `email` (string)
- `telefone` (string)
- `endereco` (string)

#### Resposta de Sucesso (201 Created)
```json
{
  "message": "Fornecedor criado com sucesso",
  "fornecedor": {
    "id": 1,
    "nome": "Fornecedor ABC Ltda",
    "cnpj": "12.345.678/0001-90",
    "email": "contato@fornecedorabc.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Exemplo, 123 - São Paulo, SP",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** Nome e CNPJ são obrigatórios ou CNPJ já cadastrado
- **401 Unauthorized:** Token ausente ou inválido
- **500 Internal Server Error:** Erro ao criar fornecedor

---

### 2. Listar Todos os Fornecedores

**Endpoint:** `GET /api/fornecedores`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": 1,
    "nome": "Fornecedor ABC Ltda",
    "cnpj": "12.345.678/0001-90",
    "email": "contato@fornecedorabc.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Exemplo, 123 - São Paulo, SP",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "Fornecedor XYZ S.A.",
    "cnpj": "98.765.432/0001-10",
    "email": "contato@fornecedorxyz.com",
    "telefone": "(21) 88888-8888",
    "endereco": "Avenida Principal, 456 - Rio de Janeiro, RJ",
    "created_at": "2024-01-16T14:20:00.000Z",
    "updated_at": "2024-01-16T14:20:00.000Z"
  }
]
```

#### Possíveis Erros
- **401 Unauthorized:** Token ausente ou inválido
- **500 Internal Server Error:** Erro ao buscar fornecedores

---

### 3. Buscar Fornecedor por ID

**Endpoint:** `GET /api/fornecedores/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do fornecedor

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "id": 1,
  "nome": "Fornecedor ABC Ltda",
  "cnpj": "12.345.678/0001-90",
  "email": "contato@fornecedorabc.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua Exemplo, 123 - São Paulo, SP",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Fornecedor não encontrado
- **500 Internal Server Error:** Erro ao buscar fornecedor

---

### 4. Atualizar Fornecedor

**Endpoint:** `PUT /api/fornecedores/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Parâmetros de URL
- `id` (obrigatório): ID do fornecedor

#### Body (atualização parcial - envie apenas os campos que deseja atualizar)
```json
{
  "nome": "Fornecedor ABC Ltda - Filial",
  "email": "novoemail@fornecedorabc.com",
  "telefone": "(11) 98888-8888",
  "endereco": "Nova Rua, 456 - São Paulo, SP",
  "cnpj": "12.345.678/0001-91"
}
```

#### Exemplo: Atualizar apenas o email
```json
{
  "email": "novoemail@fornecedorabc.com"
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Fornecedor atualizado com sucesso",
  "fornecedor": {
    "id": 1,
    "nome": "Fornecedor ABC Ltda - Filial",
    "cnpj": "12.345.678/0001-91",
    "email": "novoemail@fornecedorabc.com",
    "telefone": "(11) 98888-8888",
    "endereco": "Nova Rua, 456 - São Paulo, SP",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T12:00:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido ou CNPJ já cadastrado para outro fornecedor
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Fornecedor não encontrado
- **500 Internal Server Error:** Erro ao atualizar fornecedor

---

### 5. Deletar Fornecedor

**Endpoint:** `DELETE /api/fornecedores/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do fornecedor

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Fornecedor deletado com sucesso"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Fornecedor não encontrado
- **500 Internal Server Error:** Erro ao deletar fornecedor

---

## 📦 Produtos

### 1. Criar Produto

**Endpoint:** `POST /api/produtos`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Body
```json
{
  "nome": "Café em Grãos Especial - 1kg",
  "descricao": "Grãos 100% Arábica de torra média. Produto selecionado de origem única.",
  "preco": 85.50,
  "quantidade": 50,
  "categoria": "Bebidas",
  "fornecedor_id": 1
}
```

**Campos obrigatórios:**
- `nome` (string)
- `preco` (number, decimal)
- `quantidade` (number, inteiro)
- `categoria` (string) ⚠️ **OBRIGATÓRIO**
- `fornecedor_id` (number) ⚠️ **OBRIGATÓRIO**

**Campos opcionais:**
- `descricao` (string)

#### Resposta de Sucesso (201 Created)
```json
{
  "message": "Produto criado com sucesso",
  "produto": {
    "id": 1,
    "nome": "Café em Grãos Especial - 1kg",
    "descricao": "Grãos 100% Arábica de torra média. Produto selecionado de origem única.",
    "preco": "85.50",
    "quantidade": 50,
    "categoria": "Bebidas",
    "fornecedor_id": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** Campos obrigatórios faltando, fornecedor não encontrado, preço/quantidade negativos
  ```json
  {
    "error": "Campos obrigatórios faltando",
    "campos": ["categoria", "fornecedor_id"],
    "mensagem": "Os seguintes campos são obrigatórios: categoria, fornecedor_id"
  }
  ```
- **401 Unauthorized:** Token ausente ou inválido
- **500 Internal Server Error:** Erro ao criar produto

---

### 2. Listar Todos os Produtos

**Endpoint:** `GET /api/produtos`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Query Parameters (opcional)
- `categoria` (string): Filtrar produtos por categoria
  - Exemplo: `/api/produtos?categoria=Bebidas`

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
[
  {
    "id": 1,
    "nome": "Café em Grãos Especial - 1kg",
    "descricao": "Grãos 100% Arábica de torra média.",
    "preco": "85.50",
    "quantidade": 50,
    "categoria": "Bebidas",
    "fornecedor_id": 1,
    "fornecedor": {
      "id": 1,
      "nome": "Fornecedor ABC Ltda",
      "email": "contato@fornecedorabc.com",
      "telefone": "(11) 99999-9999",
      "endereco": "Rua Exemplo, 123",
      "cnpj": "12.345.678/0001-90"
    },
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "Notebook Dell Inspiron 15",
    "descricao": "Notebook com processador Intel i5, 8GB RAM, SSD 256GB",
    "preco": "3500.00",
    "quantidade": 10,
    "categoria": "Eletrônicos",
    "fornecedor_id": 2,
    "fornecedor": {
      "id": 2,
      "nome": "Fornecedor XYZ S.A.",
      "email": "contato@fornecedorxyz.com",
      "telefone": "(21) 88888-8888",
      "endereco": "Avenida Principal, 456",
      "cnpj": "98.765.432/0001-10"
    },
    "created_at": "2024-01-16T14:20:00.000Z",
    "updated_at": "2024-01-16T14:20:00.000Z"
  }
]
```

#### Possíveis Erros
- **401 Unauthorized:** Token ausente ou inválido
- **500 Internal Server Error:** Erro ao buscar produtos

---

### 3. Buscar Produto por ID

**Endpoint:** `GET /api/produtos/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do produto

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "id": 1,
  "nome": "Café em Grãos Especial - 1kg",
  "descricao": "Grãos 100% Arábica de torra média. Produto selecionado de origem única.",
  "preco": "85.50",
  "quantidade": 50,
  "categoria": "Bebidas",
  "fornecedor_id": 1,
  "fornecedor": {
    "id": 1,
    "nome": "Fornecedor ABC Ltda",
    "email": "contato@fornecedorabc.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Exemplo, 123",
    "cnpj": "12.345.678/0001-90"
  },
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Produto não encontrado
- **500 Internal Server Error:** Erro ao buscar produto

---

### 4. Atualizar Produto

**Endpoint:** `PUT /api/produtos/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Parâmetros de URL
- `id` (obrigatório): ID do produto

#### Body (atualização parcial - envie apenas os campos que deseja atualizar)
```json
{
  "nome": "Café Premium - 1kg",
  "descricao": "Grãos premium 100% Arábica",
  "preco": 95.00,
  "quantidade": 60,
  "categoria": "Bebidas Premium",
  "fornecedor_id": 2
}
```

#### Exemplo: Atualizar apenas a categoria
```json
{
  "categoria": "Bebidas Quentes"
}
```

#### Exemplo: Atualizar categoria e preço
```json
{
  "categoria": "Bebidas",
  "preco": 95.00
}
```

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Produto atualizado com sucesso",
  "produto": {
    "id": 1,
    "nome": "Café Premium - 1kg",
    "descricao": "Grãos premium 100% Arábica",
    "preco": "95.00",
    "quantidade": 60,
    "categoria": "Bebidas Premium",
    "fornecedor_id": 2,
    "fornecedor": {
      "id": 2,
      "nome": "Fornecedor XYZ S.A.",
      "email": "contato@fornecedorxyz.com",
      "telefone": "(21) 88888-8888",
      "endereco": "Avenida Principal, 456",
      "cnpj": "98.765.432/0001-10"
    },
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T13:15:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido, fornecedor não encontrado, preço/quantidade negativos
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Produto não encontrado
- **500 Internal Server Error:** Erro ao atualizar produto

---

### 5. Deletar Produto

**Endpoint:** `DELETE /api/produtos/:id`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
```

#### Parâmetros de URL
- `id` (obrigatório): ID do produto

#### Body
Não requerido

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Produto deletado com sucesso"
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Produto não encontrado
- **500 Internal Server Error:** Erro ao deletar produto

---

### 6. Atualizar Quantidade do Produto

**Endpoint:** `PATCH /api/produtos/:id/quantidade`  
**Autenticação:** ✅ Requerida

#### Headers
```
Authorization: Bearer <seu_token>
Content-Type: application/json
```

#### Parâmetros de URL
- `id` (obrigatório): ID do produto

#### Body - Opção 1: Definir quantidade absoluta
```json
{
  "quantidade": 75
}
```

#### Body - Opção 2: Adicionar quantidade
```json
{
  "quantidade": 10,
  "operacao": "adicionar"
}
```

#### Body - Opção 3: Remover quantidade
```json
{
  "quantidade": 5,
  "operacao": "remover"
}
```

**Operações disponíveis:**
- Sem `operacao` ou qualquer valor diferente: define a quantidade absoluta
- `"operacao": "adicionar"`: adiciona a quantidade informada ao estoque atual
- `"operacao": "remover"`: remove a quantidade informada do estoque atual

#### Resposta de Sucesso (200 OK)
```json
{
  "message": "Quantidade atualizada com sucesso",
  "produto": {
    "id": 1,
    "nome": "Café em Grãos Especial - 1kg",
    "descricao": "Grãos 100% Arábica de torra média.",
    "preco": "85.50",
    "quantidade": 75,
    "categoria": "Bebidas",
    "fornecedor_id": 1,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T14:00:00.000Z"
  }
}
```

#### Possíveis Erros
- **400 Bad Request:** ID inválido, quantidade obrigatória, quantidade insuficiente em estoque, quantidade não pode ser negativa
  ```json
  {
    "error": "Quantidade insuficiente em estoque"
  }
  ```
- **401 Unauthorized:** Token ausente ou inválido
- **404 Not Found:** Produto não encontrado
- **500 Internal Server Error:** Erro ao atualizar quantidade

---

## 📊 Resumo de Endpoints

### Rotas Públicas (não requerem autenticação)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/usuarios/cadastro` | Cadastrar novo usuário |
| POST | `/api/usuarios/login` | Fazer login e obter token |

### Rotas Protegidas (requerem autenticação)

#### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Listar todos os usuários |
| GET | `/api/usuarios/:id` | Buscar usuário por ID |
| PUT | `/api/usuarios/:id` | Atualizar usuário |
| DELETE | `/api/usuarios/:id` | Deletar usuário |

#### Fornecedores
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/fornecedores` | Criar fornecedor |
| GET | `/api/fornecedores` | Listar todos os fornecedores |
| GET | `/api/fornecedores/:id` | Buscar fornecedor por ID |
| PUT | `/api/fornecedores/:id` | Atualizar fornecedor |
| DELETE | `/api/fornecedores/:id` | Deletar fornecedor |

#### Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/produtos` | Criar produto |
| GET | `/api/produtos` | Listar todos os produtos |
| GET | `/api/produtos?categoria=X` | Listar produtos por categoria |
| GET | `/api/produtos/:id` | Buscar produto por ID |
| PUT | `/api/produtos/:id` | Atualizar produto |
| DELETE | `/api/produtos/:id` | Deletar produto |
| PATCH | `/api/produtos/:id/quantidade` | Atualizar quantidade do produto |

---

## 🔑 Códigos de Status HTTP

| Código | Descrição | Quando ocorre |
|--------|-----------|---------------|
| 200 | OK | Operação realizada com sucesso |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos ou campos obrigatórios faltando |
| 401 | Unauthorized | Token ausente ou inválido |
| 403 | Forbidden | Token inválido ou expirado |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

---

## 🛠️ Exemplos de Uso com cURL

### Cadastrar Usuário
```bash
curl -X POST http://localhost:3000/api/usuarios/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

### Fazer Login
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

### Criar Produto (com token)
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Authorization: Bearer seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Café em Grãos - 1kg",
    "descricao": "Grãos 100% Arábica",
    "preco": 85.50,
    "quantidade": 50,
    "categoria": "Bebidas",
    "fornecedor_id": 1
  }'
```

### Listar Produtos
```bash
curl -X GET http://localhost:3000/api/produtos \
  -H "Authorization: Bearer seu_token_aqui"
```

### Atualizar Produto
```bash
curl -X PUT http://localhost:3000/api/produtos/1 \
  -H "Authorization: Bearer seu_token_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "categoria": "Bebidas Premium",
    "preco": 95.00
  }'
```

---

## 📝 Notas Importantes

1. **Autenticação:** Todas as rotas protegidas requerem o header `Authorization: Bearer <token>`
2. **Token JWT:** O token expira em 24 horas (configurável)
3. **Atualização Parcial:** Nos métodos PUT, você pode enviar apenas os campos que deseja atualizar
4. **Validações:**
   - Email único para usuários
   - CNPJ único para fornecedores
   - Fornecedor deve existir ao criar produto
   - Preço e quantidade não podem ser negativos
5. **Senhas:** Senhas são criptografadas automaticamente usando bcrypt
6. **Categoria e Fornecedor:** São obrigatórios na criação de produtos

---

**Última atualização:** Janeiro 2024

