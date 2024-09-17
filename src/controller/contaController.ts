import { Request, Response } from "express";
import ContaServiceImpl from "../services/impl/contaServiceImpl";
import bcrypt from 'bcryptjs';


const contaService = new ContaServiceImpl();

export namespace ContaController {    

    export const visualizarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarioAutenticado = req.user;
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
            const usuarioId = usuarioAutenticado.id;   // Obtem o ID do usuário autenticado
    
            const usuario = await contaService.buscarUsuarioPorId(usuarioId); // Busca o usuário no banco de dados pelo ID

            if (!usuario) { 
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao visualizar conta", error });
        }
    };
    
    export const atualizarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarioAutenticado = req.user; // Verifica se o usuário está autenticado

            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }

            // Obtém o ID do usuário autenticado
            const usuarioId = usuarioAutenticado.id;
            if (usuarioId === undefined) {
                return res.status(400).json({ message: "ID do usuário não encontrado." });
            }

            const dadosAtualizados = req.body;  // Dados atualizados recebidos no corpo da requisição

            const hash = bcrypt.hashSync(dadosAtualizados.senha, 10);
            dadosAtualizados.senha = hash;

            const usuarioAtualizado = await contaService.atualizarUsuario(usuarioId, dadosAtualizados);
            if (!usuarioAtualizado) { // Atualiza o usuário
                return res.status(404).json({ message: "Usuário não encontrado para atualização." });
            }

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar conta do usuário", error });
        }
    };

    export const deletarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarioAutenticado = req.user; // Verifica se o usuário está autenticado
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
    
            const usuarioId = usuarioAutenticado.id; // Obtém o ID do usuário autenticado
            if (usuarioId === undefined) {
                return res.status(400).json({ message: "ID do usuário não encontrado." });
            }
            
            const roleUsuario = usuarioAutenticado.roleId
            if (roleUsuario === 1) {
                return res.status(403).json({ message: "Voce não pode deletar sua conta :P" });
            }

            const resultado = await contaService.deletarUsuario(usuarioId); // Deleta o usuário
            if (!resultado) {
                return res.status(404).json({ message: "Usuário não encontrado para deleção." });
            }
    
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar conta do usuário", error });
        }
    };    
}