import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireAdmin, requireReader } from '../middleware/roleMiddleware';

const router = Router();

// Rota acessível apenas por administradores
router.get('/admin', authMiddleware, requireAdmin, (req, res) => {
    res.status(200).json({ message: 'Bem-vindo, administrador! Você tem acesso a esta rota.' });
});

// Rota acessível apenas por leitores
router.get('/cliente', authMiddleware, requireReader, (req, res) => {
    res.status(200).json({ message: 'Bem-vindo, cliente! Você tem acesso a esta rota.' });
});

export default router;
