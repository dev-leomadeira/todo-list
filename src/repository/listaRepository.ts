import { ListaAtributoCriacao } from "../interface/lista.interface";
import Lista from "../models/lista.model";

class ListaRepository {

  public async criarLista(dados: ListaAtributoCriacao): Promise<Lista> {
    dados.dataCriacao = new Date();
    return Lista.create(dados);
}

  public async buscarListaPorUsuario(usuarioId: number): Promise<Lista[]> {
    return await Lista.findAll({ where: { usuarioId } });
  }

  public async atualizarLista(id: number, novoNome: string): Promise<void> {
    const lista = await Lista.findByPk(id);
    if (lista) {
      await lista.update({ nome: novoNome, dataCriacao: new Date() });
    }
  }

  public async deletarLista(id: number, usuarioId: number): Promise<void> {
    await Lista.destroy({ where: { id, usuarioId } });
  }
}

export default ListaRepository;
