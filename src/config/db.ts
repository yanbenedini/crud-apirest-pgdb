import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_DATABASE,
});

// Test the database connection
pool.connect((err, client) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados: ', err.stack);
    }
    if (client) {
        console.log('Conectado ao banco de dados com sucesso!');
        client.release(); // Libera a conexão de volta para o pool
    }
});

export default pool;