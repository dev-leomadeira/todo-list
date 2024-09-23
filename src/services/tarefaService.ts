import {TarefaAtributoCriacao,TarefaAtributos} from "../interface/tarefa.interface";
import Tarefa from "../models/tarefa.model";

export interface TarefaService {
  criarTarefa(tarefa: TarefaAtributoCriacao): Promise<Tarefa>;
  buscarTodasTarefas(): Promise<Tarefa[]>;
  buscarTarefaPorId(id: number): Promise<Tarefa | null>;
  atualizarTarefa(id: number, tarefa: Partial<TarefaAtributos>): Promise<Tarefa | null>;
  deletarTarefa(id: number): Promise<void>;
}
