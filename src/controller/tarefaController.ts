import { Request, Response } from "express";
import TarefaServiceImpl from "../services/impl/tarefaServiceImpl";
import ListaServiceImpl from "../services/impl/listaServiceImpl";

const tarefaService = new TarefaServiceImpl();
const listaService = new ListaServiceImpl();

export namespace TarefaController {
    export const criarTarefa = async (req : Request, res : Response): Promise<Response> => {
        try {
            const { descricao, listaId } = req.body;
            const usuarioId = req.user?.id;

            if(!usuarioId){
                return res.status(400).json({ message: "Usuário não encontrado" });
            }
            // Verifica se a lista pertence ao usuário
            const lista = await listaService.buscarListaPorId(listaId);
            if (!lista || lista.usuarioId !== usuarioId) {
                return res.status(403).json({ message: "Você não tem permissão para adicionar tarefas a esta lista." });
            }

            const tarefa = await tarefaService.criarTarefa(descricao, listaId);
            return res.status(201).json({ message: "Tarefa criada com sucesso", tarefa });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar tarefa", error });
        }
    }

    export const buscarTarefasPorLista = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { listaId } = req.params;
            const usuarioId = req.user?.id;

            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }

            const lista = await listaService.buscarListaPorId(Number(listaId));
            if (!lista || lista.usuarioId !== usuarioId) {
                return res.status(403).json({ message: "Você não tem permissão para acessar as tarefas desta lista." });
            }

            const tarefas = await tarefaService.buscarTarefasPorLista(Number(listaId));
            return res.status(200).json(tarefas);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar tarefas", error });
        }
    };

    export const atualizarTarefa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { descricao, concluida } = req.body;
            const usuarioId = req.user?.id;

            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }

            const tarefa = await tarefaService.buscarTarefasPorLista(Number(id));

            if (!tarefa) {
                return res.status(404).json({ message: "Tarefa não encontrada." });
            }

            await tarefaService.atualizarTarefa(Number(id), descricao, concluida);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar tarefa", error });
        }
    };

    export const deletarTarefa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id, listaId } = req.params;
            const usuarioId = req.user?.id;

            if (!usuarioId) {
                return res.status(400).json({ message: "Usuário não autenticado." });
            }

            const tarefa = await tarefaService.buscarTarefasPorLista(Number(listaId));

            if (!tarefa) {
                return res.status(404).json({ message: "Tarefa não encontrada." });
            }

            const lista = await listaService.buscarListaPorId(Number(listaId));
            if (!lista || lista.usuarioId !== usuarioId) {
                return res.status(403).json({ message: "Você não tem permissão para deletar esta tarefa." });
            }
            
            await tarefaService.deletarTarefa(Number(id), Number(listaId));
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar tarefa", error });
        }
    };
}