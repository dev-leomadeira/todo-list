import { Request, Response } from "express";
import tarefaService from "../services/impl/tarefaServiceImpl";
import { TarefaAtributoCriacao } from "../interface/tarefa.interface";

export namespace TarefaController {
  
  export const criarTarefa = async (req: Request, res: Response): Promise<Response> => {
    try {
        const dadosTarefa: TarefaAtributoCriacao = req.body;
        const Tarefa = await tarefaService.criarTarefa(dadosTarefa);
        return res.status(201).json(Tarefa);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno ao criar tarefa", error });
    }
  };  

  export const buscarTarefaPorId = async (req: Request, res: Response): Promise<Response> => {
      try {
          const id = parseInt(req.params.id, 10);
          const Tarefa = await tarefaService.buscarTarefaPorId(id);
          return res.status(200).json(Tarefa);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar tarefa por ID", error });
      }
  };

  export const buscarTodosTarefas = async (req: Request, res: Response): Promise<Response> => {
      try {
          const Tarefas = await tarefaService.buscarTodasTarefas();
          return res.status(200).json(Tarefas);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao buscar todos os tarefas", error });
      }
  };

  export const atualizarTarefa = async (req: Request, res: Response): Promise<Response> => {
      try {
          const id = parseInt(req.params.id, 10);
          const dadosAtualizados = req.body;
          const TarefaAtualizado = await tarefaService.atualizarTarefa(id, dadosAtualizados);
          return res.status(200).json(TarefaAtualizado);
      } catch (error) {
          return res.status(500).json({ message: "Erro ao atualizar tarefa", error });
      }
  };

  export const deletarTarefa = async (req: Request, res: Response): Promise<Response> => {
      try {        
          const id = parseInt(req.params.id, 10);
          await tarefaService.deletarTarefa(id);
          return res.status(204).send();
      } catch (error) {
          return res.status(500).json({ message: "Erro ao deletar tarefa", error });
      }
  };
}