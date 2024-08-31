import { Request, Response, NextFunction } from 'express';

// Valida os dados de entrada
const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Dados de entrada inválidos" });
    }
    next();
};

const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: "Dados de entrada inválidos" });
    }
    next();
};

export { validateRegisterInput, validateLoginInput };
