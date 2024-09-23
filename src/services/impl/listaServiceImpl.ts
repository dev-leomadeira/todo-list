import { ListaAtributoCriacao, ListaAtributos } from "../../interface/lista.interface";
import Lista from "../../models/lista.model";
import listaRepository from "../../repository/listaRepository";
import { ListaService } from "../listaService";

class ListaServiceImpl implements ListaService {
  async criarLista(lista: ListaAtributoCriacao): Promise<Lista> {
    if (!lista.nome) {
      throw new Error("O nome da lista é obrigatório");
    }
      return await listaRepository.criarLista(lista);
  }
  async buscarTodasListas(): Promise<Lista[]> {
    return await listaRepository.buscarTodasListas();
  }

  async buscarListaPorId(id: number): Promise<Lista | null>{
    return await listaRepository.buscarListaPorId(id);
  }

  async atualizarLista(id: number, lista: Partial<ListaAtributos>): Promise<Lista | null> {
    try {
      const existenteLista = await listaRepository.buscarListaPorId(id);
      if (!existenteLista) {
        throw new Error("Lista não encontrada");
      }
      return await listaRepository.atualizarLista(id, lista)
    } catch (error) {
      throw new Error("Erro ao atualizar pelo service")
    }
  }

  async deletarLista(id: number): Promise<void> {
    const existenteLista = await listaRepository.buscarListaPorId(id);
    if (!existenteLista) {
      throw new Error("Lista não encontrada");
    }
    return await listaRepository.deletarLista(id);
  }
}

export default new ListaServiceImpl();