import { ListaAtributoCriacao, ListaAtributos } from "../interface/lista.interface";
import Lista from "../models/lista.model";

class ListaRepository {

  async criarLista(dados: ListaAtributoCriacao): Promise<Lista> {
    return await Lista.create(dados);
  }

  async buscarTodasListas(): Promise<Lista[]> {
    return await Lista.findAll();
  }

  async buscarListaPorId(id: number): Promise<Lista | null> {
    return await Lista.findByPk(id);
  }

  async atualizarLista(id: number, atualizacoes: Partial<ListaAtributos>): Promise<Lista | null> {
    const existingLista = await this.buscarListaPorId(id);
    if (!existingLista) {
      throw new Error("Lista não encontrada.");
    }
    return await existingLista.update(atualizacoes);
  }

  public async deletarLista(id: number): Promise<void> {
    const existingLista = await this.buscarListaPorId(id);
    if (!existingLista) {
      throw new Error("Lista não encontrada.");
    }
    return await existingLista.destroy();
  }
}

export default new ListaRepository();
