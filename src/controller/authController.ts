import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export namespace AuthController {
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