import { Request, Response } from "express";
import UsuarioServiceImpl from "../services/impl/usuarioServiceImpl";

const usuarioService = new UsuarioServiceImpl();

export namespace UsuarioController {
    export const criarUsuario = async (req: Request, res: Response) => {
        try {
            const usuarioAutenticado = req.user;
            if (!usuarioAutenticado || usuarioAutenticado.roleId !== 1) {
                return res.status(403).json({ message: "Acesso negado. Apenas administradores podem criar usuários." });
            }
  
            const { nome, email, senha } = req.body;

            const usuario = await usuarioService.criarUsuario({ nome, email, senha, papelId: 2 });
 
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ message: "Erro interno ao criar usuário" });
        }
    };

    export const buscarUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            const usuario = await usuarioService.buscarUsuarioPorId(id);
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar usuário por ID", error });
        }
    };

    export const buscarTodosUsuarios = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarios = await usuarioService.buscarTodosUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar todos os usuários", error });
        }
    };

    
    
    
    

    export const atualizarUsuario = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            const dadosAtualizados = req.body;
            const usuarioAtualizado = await usuarioService.atualizarUsuario(id, dadosAtualizados);
            if (!usuarioAtualizado) {
                return res.status(404).json({ message: "Usuário não encontrado para atualização." });
            }
            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar usuário", error });
        }
    };

    export const deletarUsuario = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            await usuarioService.deletarUsuario(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar usuário", error });
        }
    };
}