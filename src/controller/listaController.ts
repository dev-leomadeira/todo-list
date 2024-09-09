import { Request, Response } from "express";
import ListaServiceImpl from "../services/impl/listaServiceImpl";

const listaService = new ListaServiceImpl();

export namespace ListaController {
    export const criarLista = async (req: Request, res: Response): Promise<Response> => {  // Alterado de Promise<void> para Promise<Response>
        try {
            const { nome } = req.body;
            const usuarioId = req.user?.id;

            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }

            const lista = await listaService.criarLista({ nome, usuarioId });
            return res.status(201).json(lista);  // Retorne o Response diretamente
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar lista", error });  // Retorne o Response diretamente
        }
    };
    
    export const buscarListasPorUsuario = async (req: Request, res: Response): Promise<Response> => {
        try {
            const usuarioId = req.user?.id;
    
            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }
    
            const listas = await listaService.buscarListasPorUsuario(usuarioId);
            return res.status(200).json(listas);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar listas", error });
        }
    };
    
    export const atualizarLista = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            const usuarioId = req.user?.id; // Pega o usuário autenticado do token
            const { novoNome } = req.body;
    
            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }
    
            const lista = await listaService.buscarListaPorId(id);
    
            if (!lista) {
                return res.status(404).json({ message: "Lista não encontrada." });
            }
    
            if (lista.usuarioId !== usuarioId) {  // Aqui você acessa o usuarioId da lista encontrada
                return res.status(403).json({ message: "Você não tem permissão para atualizar esta lista." });
            }
    
            await listaService.atualizarLista(id, novoNome);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar lista", error });
        }
    };

    export const deletarLista = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            const usuarioId = req.user?.id; // Pega o usuário autenticado do token
    
            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }
    
            const lista = await listaService.buscarListaPorId(id);
    
            if (!lista) {
                return res.status(404).json({ message: "Lista não encontrada." });
            }
    
            if (lista.usuarioId !== usuarioId) {
                return res.status(403).json({ message: "Você não tem permissão para deletar esta lista." });
            }
    
            await listaService.deletarLista(id, usuarioId);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar lista", error });
        }
    };
};