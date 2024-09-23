import { TarefaAtributoCriacao, TarefaAtributos } from "../interface/tarefa.interface";
import Tarefa from "../models/tarefa.model";
class TarefaRepository {

  async criarTarefa(dados: TarefaAtributoCriacao): Promise<Tarefa> {
    return await Tarefa.create(dados);
  }

  async buscarTodasTarefas(): Promise<Tarefa[]> {
    return await Tarefa.findAll();
  }

  async buscarTarefaPorId(id: number): Promise<Tarefa | null> {
    return await Tarefa.findByPk(id);
  }

  async atualizarTarefa(id: number, atualizacoes: Partial<TarefaAtributos>): Promise<Tarefa | null> {
    const existingTarefa = await this.buscarTarefaPorId(id);
    if (!existingTarefa) {
      throw new Error("Tarefa não encontrada.");
    }
    return await existingTarefa.update(atualizacoes);
  }

  public async deletarTarefa(id: number): Promise<void> {
    const existingTarefa = await this.buscarTarefaPorId(id);
    if (!existingTarefa) {
      throw new Error("Tarefa não encontrada.");
    }
    return await existingTarefa.destroy();
  }
}

export default new TarefaRepository();
