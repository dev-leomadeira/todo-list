import { Request, Response } from "express";
import ContaServiceImpl from "../services/impl/contaServiceImpl";
import bcrypt from 'bcryptjs';


const contaService = new ContaServiceImpl();

export namespace ContaController {    

    export const visualizarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Verifica se o usuário está autenticado
            const usuarioAutenticado = req.user;
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
    
            // Obtem o ID do usuário autenticado
            const usuarioId = usuarioAutenticado.id;
    
            // Busca o usuário no banco de dados pelo ID
            const usuario = await contaService.buscarUsuarioPorId(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
    
            // Retorna os dados do usuário
            return res.status(200).json(usuario);
        } catch (error) {
            console.error("Erro ao visualizar conta:", error);
            return res.status(500).json({ message: "Erro ao visualizar conta", error });
        }
    };
    
    export const atualizarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Verifica se o usuário está autenticado
            const usuarioAutenticado = req.user;
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }

            // Obtém o ID do usuário autenticado
            const usuarioId = usuarioAutenticado.id;
            if (usuarioId === undefined) {
                return res.status(400).json({ message: "ID do usuário não encontrado." });
            }

            // Dados atualizados recebidos no corpo da requisição
            const dadosAtualizados = req.body;

            //import bcrypt from 'bcryptjs';
            //adicionar bcrypt na senha:
            const hash = bcrypt.hashSync(dadosAtualizados.senha, 10);
            dadosAtualizados.senha = hash;

            // Atualiza o usuário
            const usuarioAtualizado = await contaService.atualizarUsuario(usuarioId, dadosAtualizados);
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: "Usuário não encontrado para atualização." });
            }

            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar conta do usuário", error });
        }
    };

    export const deletarConta = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Verifica se o usuário está autenticado
            const usuarioAutenticado = req.user;
            if (!usuarioAutenticado) {
                return res.status(401).json({ message: "Usuário não autenticado." });
            }
    
            // Obtém o ID do usuário autenticado
            const usuarioId = usuarioAutenticado.id;
            if (usuarioId === undefined) {
                return res.status(400).json({ message: "ID do usuário não encontrado." });
            }
            
            const roleUsuario = usuarioAutenticado.roleId
            if (roleUsuario === 1) {
                return res.status(403).json({ message: "Voce não pode deletar sua conta :P" });
            }

            // Deleta o usuário
            const resultado = await contaService.deletarUsuario(usuarioId);
            if (!resultado) {
                return res.status(404).json({ message: "Usuário não encontrado para deleção." });
            }
    
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar conta do usuário", error });
        }
    };    
}