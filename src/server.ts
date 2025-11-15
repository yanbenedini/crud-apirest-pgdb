import express, { Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user.route';
import fornecedorRouter from './routes/fornecedor.route';
import produtoRouter from './routes/produto.route';
import pool from './config/db';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (_, res: Response) => {
    res.json({ 
        message: 'API de Controle de Estoque',
        version: '1.0.0',
        endpoints: {
            usuarios: '/api/usuarios',
            fornecedores: '/api/fornecedores',
            produtos: '/api/produtos'
        }
    });
});

app.use('/api/usuarios', userRouter);
app.use('/api/fornecedores', fornecedorRouter);
app.use('/api/produtos', produtoRouter);

// Inicializar banco de dados
async function initializeDatabase() {
    try {
        const schemaPath = join(__dirname, 'database', 'schema.sql');
        const schema = readFileSync(schemaPath, 'utf-8');
        
        // Executa o schema SQL
        await pool.query(schema);
        console.log('✅ Banco de dados inicializado com sucesso!');
    } catch (error: any) {
        if (error.code === '42P07') {
            // Tabela já existe
            console.log('ℹ️  Tabelas já existem no banco de dados');
        } else {
            console.error('❌ Erro ao inicializar banco de dados:', error.message);
        }
    }
}

// Iniciar servidor
app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    await initializeDatabase();
});