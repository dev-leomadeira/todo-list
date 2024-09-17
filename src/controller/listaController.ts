import { Request, Response } from "express";
import ListaServiceImpl from "../services/impl/listaServiceImpl";
import { ListaAtributoCriacao } from "../interface/lista.interface";

const listaService = new ListaServiceImpl();

export namespace ListaController {
  export const criarLista = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { nome } = req.body;
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(400).json({ message: "Usuário não autenticado." });
      }

      const dadosLista: ListaAtributoCriacao = { nome, usuarioId };
      const lista = await listaService.criarLista(dadosLista);
      return res.status(201).json(lista);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar lista", error });
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
      const usuarioId = req.user?.id;
      const { novoNome } = req.body;

      if (!usuarioId) {
        return res.status(400).json({ message: "Usuário não autenticado." });
      }

      await listaService.atualizarLista(id, novoNome, usuarioId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar lista", error });
    }
  };

  export const deletarLista = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      const usuarioId = req.user?.id;

      if (!usuarioId) {
        return res.status(400).json({ message: "Usuário não autenticado." });
      }

      await listaService.deletarLista(id, usuarioId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar lista", error });
    }
  };
}