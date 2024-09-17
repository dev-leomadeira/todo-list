import { TarefaAtributoCriacao } from "../interface/tarefa.interface";
import Tarefa from "../models/tarefa.model";

export interface TarefaService {
    criarTarefa(dados: TarefaAtributoCriacao): Promise<Tarefa>
    buscarTarefasPorLista(listaId: number): Promise<Tarefa[]>;
    atualizarTarefa(id: number, descricao: string, concluida: boolean): Promise<void>;
    deletarTarefa(id: number, listaId: number): Promise<void>;
}