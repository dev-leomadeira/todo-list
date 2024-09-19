import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const usuarioAutenticado = req.user;

    if (!usuarioAutenticado || usuarioAutenticado.roleId !== 1) {
        return res.status(403).json({ message: "Acesso negado. Apenas administradores podem executar essa ação." });
    }

    next();
};
