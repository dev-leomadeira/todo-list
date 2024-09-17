import { Request, Response } from "express";
import UsuarioServiceImpl from "../services/impl/usuarioServiceImpl";
import { UsuarioAtributosCriacao } from "../interface/usuario.interface";

const usuarioService = new UsuarioServiceImpl();

export namespace UsuarioController {
    export const criarUsuario = async (req: Request, res: Response) => {
        try {
            const dadosUsuario: UsuarioAtributosCriacao = req.body;
            const usuario = await usuarioService.criarUsuario(dadosUsuario);
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(500).json({ message: "Erro interno ao criar usuário", error });
        }
    };

    export const buscarUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            const usuario = await usuarioService.buscarUsuarioPorId(id);
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