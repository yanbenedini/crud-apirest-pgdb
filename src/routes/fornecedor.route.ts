import express from 'express';
import fornecedorController from '../controllers/fornecedor.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas as rotas requerem autenticação
router.post('/', authenticateToken, fornecedorController.createFornecedor.bind(fornecedorController));
router.get('/', authenticateToken, fornecedorController.getAllFornecedores.bind(fornecedorController));
router.get('/:id', authenticateToken, fornecedorController.getFornecedorById.bind(fornecedorController));
router.put('/:id', authenticateToken, fornecedorController.updateFornecedor.bind(fornecedorController));
router.delete('/:id', authenticateToken, fornecedorController.deleteFornecedor.bind(fornecedorController));

export default router;

