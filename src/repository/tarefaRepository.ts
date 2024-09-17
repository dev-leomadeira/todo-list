import { TarefaAtributoCriacao, TarefaAtributos } from "../interface/tarefa.interface";
import Tarefa from "../models/tarefa.model";
class TarefaRepository {

  public async criarTarefa(dados: TarefaAtributoCriacao): Promise<Tarefa> {
    return Tarefa.create({ 
        ...dados, 
        dataCriacao: new Date(), 
        concluida: false
    });
  }

  public async buscarTarefasPorLista(listaId: number): Promise<Tarefa[]> {
    return await Tarefa.findAll({ where: { listaId } });
  }

  public async atualizarTarefa(id: number, atualizacoes: Partial<TarefaAtributos>): Promise<void> {
    const tarefa = await Tarefa.findByPk(id);
    if (tarefa) {
      await tarefa.update(atualizacoes);
    }
  }

  public async deletarTarefa(id: number, listaId: number): Promise<void> {
    await Tarefa.destroy({ where: { id, listaId } });
  }
}

export default TarefaRepository;
