import { Request, Response } from "express";
import listaService from "../services/impl/listaServiceImpl";
import { ListaAtributoCriacao } from "../interface/lista.interface";

export namespace ListaController {
  
  export const criarLista = async (req: Request, res: Response): Promise<Response> => {
    try {
      const  { nome } = req.body;
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

  export const buscarListaPorId = async (req: Request, res: Response): Promise<Response> => {
      try {
          const id = parseInt(req.params.id, 10);
          const Lista = await listaService.buscarListaPorId(id);
          return res.status(200).json(Lista);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar lista por ID", error });
      }
  };

  export const buscarTodosListas = async (req: Request, res: Response): Promise<Response> => {
      try {
          const Listas = await listaService.buscarTodasListas();
          return res.status(200).json(Listas);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar todos os listas", error });
      }
  };

  export const atualizarLista = async (req: Request, res: Response): Promise<Response> => {
      try {
          const id = parseInt(req.params.id, 10);
          const dadosAtualizados = req.body;
          const listaAtualizado = await listaService.atualizarLista(id, dadosAtualizados);
          return res.status(200).json(listaAtualizado);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao atualizar lista", error });
      }
  };

  export const deletarLista = async (req: Request, res: Response): Promise<Response> => {
      try {        
          const id = parseInt(req.params.id, 10);
          await listaService.deletarLista(id);
          return res.status(204).send();
      } catch (error) {
          return res.status(500).json({ message: "Erro ao deletar lista", error });
      }
  };
}