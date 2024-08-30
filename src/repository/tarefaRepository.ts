import Tarefa from "../models/tarefa.model";
class TarefaRepository {

  // Método para criar uma nova tarefa em uma lista
  public async criarTarefa(dados: { descricao: string, listaId: number }): Promise<Tarefa> {
    const dataCriacao = new Date(); // Define a data de criação como a data atual
    const concluida = false;  // Define o status de concluída como false
    return await Tarefa.create({ // Cria a tarefa no banco de dados com todos os dados
        ...dados, // Espalha os dados fornecidos
        dataCriacao, 
        concluida });
  }

  // Método para buscar todas as tarefas de uma lista específica
  public async buscarTarefasPorLista(listaId: number): Promise<Tarefa[]> {
    return await Tarefa.findAll({ where: { listaId } });
  }

  // Método para atualizar uma tarefa específica
  public async atualizarTarefa(id: number, atualizacoes: { descricao?: string, concluida?: boolean }): Promise<void> {
    const tarefa = await Tarefa.findByPk(id);
    if (tarefa) {
      await tarefa.update(atualizacoes);
    }
  }

  // Método para deletar uma tarefa específica
  public async deletarTarefa(id: number, listaId: number): Promise<void> {
    await Tarefa.destroy({ where: { id, listaId } });
  }
}

export default TarefaRepository;
