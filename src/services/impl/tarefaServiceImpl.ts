import { TarefaAtributoCriacao } from "../../interface/tarefa.interface";
import Tarefa from "../../models/tarefa.model";
import TarefaRepository from "../../repository/tarefaRepository";
import { TarefaService } from "../tarefaService";

class TarefaServiceImpl implements TarefaService{
    private tarefaRepository: TarefaRepository;

    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async criarTarefa(dados: TarefaAtributoCriacao): Promise<Tarefa> {
        if (!dados.descricao) {
          throw new Error('A descrição é obrigatória');
        }
        
        return this.tarefaRepository.criarTarefa(dados);
      }

    async buscarTarefasPorLista(listaId: number): Promise<Tarefa[]> {
        return await this.tarefaRepository.buscarTarefasPorLista(listaId);
    }
    async atualizarTarefa(id: number, descricao: string, concluida: boolean): Promise<void> {
        return await this.tarefaRepository.atualizarTarefa(id, { descricao, concluida });
    }

    async deletarTarefa(id: number, listaId: number): Promise<void> {
        // Verifica se a tarefa existe
        const tarefa = await Tarefa.findByPk(id);
        if (!tarefa) {
          throw new Error("Tarefa não encontrada.");
        }
    
        // Verifica se a tarefa pertence à lista
        if (tarefa.listaId !== listaId) {
          throw new Error("A tarefa não pertence à lista especificada.");
        }
    
        await this.tarefaRepository.deletarTarefa(id, listaId);
      }
}

export default TarefaServiceImpl;