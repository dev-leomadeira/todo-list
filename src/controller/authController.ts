import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

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

export namespace AuthController {
    // Registra um novo usuário
    export const register = async (req: Request, res: Response) => {
        try {
            const { nome, email, senha } = req.body;
            const user = await AuthService.register(nome, email, senha);
            res.status(201).json(user);
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).json({ message: "Erro interno ao registrar usuário" });
        }
    };

    // Realiza o login do usuário
    export const login = async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;
            const { user, token } = await AuthService.login(email, senha);
            res.status(200).json({ user, token });
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    };
}

// Exporta os validadores para serem usados nas rotas
export { validateRegisterInput, validateLoginInput };
