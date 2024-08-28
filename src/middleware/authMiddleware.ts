import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

// Interface para o payload do usuário decodificado
interface DecodedUser {
    id: number;
    roleId: number;
}

// Estende a interface Request para incluir a propriedade user
declare global {
    namespace Express {
        interface Request {
            user?: DecodedUser;
        }
    }
}

// Middleware para autenticação
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Obtém o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token nao encontrado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica e decodifica o token
        const decoded = await AuthService.verifyToken(token) as DecodedUser;
        req.user = decoded;  // Adiciona o payload decodificado ao objeto request
        next();  // Passa o controle para o próximo middleware ou rota
    } catch (error) {
        res.status(401).json({ message: 'Validoção do token falhou' });
    }
};
