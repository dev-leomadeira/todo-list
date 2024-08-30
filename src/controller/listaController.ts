import { Request, Response } from "express";
import ListaServiceImpl from "../services/impl/listaServiceImpl";

const listaService = new ListaServiceImpl();

export namespace ListaController {
    export const criarLista = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, usuarioId } = req.body;
        const lista = await listaService.criarLista({ nome, usuarioId });
        res.status(201).json(lista);
    } catch (error) {
            res.status(500).json({ message: "Erro ao criar lista", error });
        };
    };

    export const buscarListasPorUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const listas = await listaService.buscarListasPorUsuario(usuarioId);
        res.status(200).json(listas);
    } catch (error) {
            res.status(500).json({ message: "Erro ao buscar listas", error });
        };
    };

    export const atualizarLista = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const { novoNome } = req.body;
        await listaService.atualizarLista(id, novoNome);
        res.status(204).json({ message: `Lista ${id} atualizada com sucesso!` });
    } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar lista", error });
        };
    };

    export const deletarLista = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const usuarioId = parseInt(req.params.usuarioId, 10);
        await listaService.deletarLista(id, usuarioId);
        res.status(204).send();
    } catch (error) {
            res.status(500).json({ message: "Erro ao deletar lista", error });
        };
    };
};