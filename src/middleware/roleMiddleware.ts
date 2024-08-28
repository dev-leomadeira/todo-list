import { Request, Response, NextFunction } from 'express';
import User from '../models/usuario.model';

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Acesso não autorizado. Token ausente ou inválido.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user || user.papelId !== 1) { // roleId 1 é para ADMIN
            return res.status(403).json({ message: 'Acesso proibido. Apenas administradores podem acessar.' });
        }

        next(); // Se o usuário for admin, permite o acesso
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao verificar o papel do usuário.' });
    }
};

export const requireReader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Acesso não autorizado. Token ausente ou inválido.' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user || user.papelId !== 2) { // roleId 2 é para READER
            return res.status(403).json({ message: 'Acesso proibido. Apenas leitores podem acessar.' });
        }

        next(); // Se o usuário for reader, permite o acesso
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao verificar o papel do usuário.' });
    }
};
