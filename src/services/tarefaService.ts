import Tarefa from "../models/tarefa.model";

export interface TarefaService {
    criarTarefa(descricao: string, listaId: number): Promise<Tarefa>;
    buscarTarefasPorLista(listaId: number): Promise<Tarefa[]>;
    atualizarTarefa(id: number, descricao: string, concluida: boolean): Promise<void>;
    deletarTarefa(id: number, listaId: number): Promise<void>;
}