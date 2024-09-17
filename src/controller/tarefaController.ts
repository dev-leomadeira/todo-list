import { Request, Response } from "express";
import TarefaServiceImpl from "../services/impl/tarefaServiceImpl";
import { TarefaAtributoCriacao } from "../interface/tarefa.interface";

const tarefaService = new TarefaServiceImpl();

export namespace TarefaController {
  
    export const criarTarefa = async (req: Request, res: Response): Promise<Response> => {
        try {
          const dados: TarefaAtributoCriacao = req.body;
          const tarefa = await tarefaService.criarTarefa(dados);
          return res.status(201).json(tarefa);
        } catch (error) {
          return res.status(500).json({ message: "Erro ao criar tarefa", error });
        }
      };

      export const buscarTarefasPorLista = async (req: Request, res: Response): Promise<Response> => {
        try {
          const listaId = parseInt(req.params.listaId, 10);
          const tarefas = await tarefaService.buscarTarefasPorLista(listaId);
          return res.status(200).json(tarefas);
        } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar tarefas", error });
        }
      };

      export const atualizarTarefa = async (req: Request, res: Response): Promise<Response> => {
        try {
          const id = parseInt(req.params.id, 10);
          const { descricao, concluida } = req.body;
          await tarefaService.atualizarTarefa(id, descricao, concluida);
          return res.status(204).send();
        } catch (error) {
          return res.status(500).json({ message: "Erro ao atualizar tarefa", error });
        }
      };

      export const deletarTarefa = async (req: Request, res: Response): Promise<Response> => {
        try {
          const id = parseInt(req.params.id, 10);
          const listaId = parseInt(req.params.listaId, 10);
          await tarefaService.deletarTarefa(id, listaId);
          return res.status(204).send();
        } catch (error) {
          return res.status(500).json({ message: "Erro ao deletar tarefa", error });
        }
      };
}
