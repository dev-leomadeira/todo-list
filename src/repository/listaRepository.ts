import Lista from "../models/lista.model";

class ListaRepository {

  // Método para criar uma nova lista para um usuário
  public async criarLista(dados: { nome: string, dataCriacao: Date, usuarioId: number }): Promise<Lista> {
    dados.dataCriacao = new Date();
    return await Lista.create(dados);
  }

  // Método para buscar todas as listas de um usuário específico
  public async buscarListaPorUsuario(usuarioId: number): Promise<Lista[]> {
    return await Lista.findAll({ where: { usuarioId } });
  }

  // Método para atualizar o nome de uma lista específica
  public async atualizarLista(id: number, novoNome: string): Promise<void> {
    const lista = await Lista.findByPk(id);
    if (lista) {
      await lista.update({ nome: novoNome, dataCriacao: new Date() });
    }
  }

  // Método para deletar uma lista por ID e usuário específico
  public async deletarLista(id: number, usuarioId: number): Promise<void> {
    await Lista.destroy({ where: { id, usuarioId } });
  }
}

export default ListaRepository;
