import Tarefa from "../../models/tarefa.model";
import TarefaRepository from "../../repository/tarefaRepository";
import { TarefaService } from "../tarefaService";

class TarefaServiceImpl implements TarefaService{
    private tarefaRepository: TarefaRepository;

    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }
    async criarTarefa(descricao: string, listaId: number): Promise<Tarefa> {
        return await this.tarefaRepository.criarTarefa({ descricao, listaId });
    }
    async buscarTarefasPorLista(listaId: number): Promise<Tarefa[]> {
        return await this.tarefaRepository.buscarTarefasPorLista(listaId);
    }
    async atualizarTarefa(id: number, descricao: string, concluida: boolean): Promise<void> {
        return await this.tarefaRepository.atualizarTarefa(id, { descricao, concluida });
    }
    async deletarTarefa(id: number, listaId: number): Promise<void> {
        await this.tarefaRepository.deletarTarefa(id, listaId);
    }
}