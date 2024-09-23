import { TarefaAtributoCriacao, TarefaAtributos } from "../../interface/tarefa.interface";
import Tarefa from "../../models/tarefa.model";
import tarefaRepository from "../../repository/tarefaRepository";
import { TarefaService } from "../tarefaService";

class TarefaServiceImpl implements TarefaService{
    async criarTarefa(tarefa: TarefaAtributoCriacao): Promise<Tarefa> {
        if (!tarefa.descricao) {
          throw new Error('A descrição é obrigatória');
        }
        
        return tarefaRepository.criarTarefa(tarefa);
      }

    async buscarTodasTarefas(): Promise<Tarefa[]> {
        return await tarefaRepository.buscarTodasTarefas();
    }
    
    async buscarTarefaPorId(id: number): Promise<Tarefa | null> {
        return await tarefaRepository.buscarTarefaPorId(id);
    }

    async atualizarTarefa(id: number, tarefa: Partial<TarefaAtributos>): Promise<Tarefa | null> {
      const existenteTarefa = await tarefaRepository.buscarTarefaPorId(id);
      if (!existenteTarefa) {
        throw new Error("Tarefa não encontrada.");
      }
      return await existenteTarefa.update(tarefa);
    }

    async deletarTarefa(id: number): Promise<void> {
        const existenteTarefa = await tarefaRepository.buscarTarefaPorId(id);
        if (!existenteTarefa) {
          throw new Error("Tarefa não encontrada.");
        }      
        await tarefaRepository.deletarTarefa(id);
      }
}

export default new TarefaServiceImpl();