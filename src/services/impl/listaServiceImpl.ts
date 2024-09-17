import { ListaAtributoCriacao } from "../../interface/lista.interface";
import Lista from "../../models/lista.model";
import ListaRepository from "../../repository/listaRepository";
import { ListaService } from "../listaService";

class ListaServiceImpl implements ListaService {
  private listaRepository: ListaRepository;

  constructor() {
    this.listaRepository = new ListaRepository();
  }

  async criarLista(dadosLista: ListaAtributoCriacao): Promise<Lista> {
      const { nome, usuarioId } = dadosLista;
      const novaLista = await this.listaRepository.criarLista({
          nome,
          usuarioId,
          dataCriacao: new Date()
      });
      return novaLista;
  }
  async buscarListasPorUsuario(usuarioId: number): Promise<Lista[]> {
    return await this.listaRepository.buscarListaPorUsuario(usuarioId);
  }
  async atualizarLista(id: number, novoNome: string, usuarioId: number): Promise<void> {
    const lista = await Lista.findByPk(id);
    if (!lista) {
      throw new Error("Lista não encontrada.");
    }
    if (lista.usuarioId !== usuarioId) {
        throw new Error("Você não tem permissão para atualizar esta lista.");
    }
    await this.listaRepository.atualizarLista(id, novoNome);
  }

  async deletarLista(id: number, usuarioId: number): Promise<void> {
    const lista = await Lista.findByPk(id);
    if (!lista) {
      throw new Error("Lista não encontrada");
    }
    if (lista.usuarioId !== usuarioId) {
      throw new Error("Você não tem permissão para deletar esta lista");
    }
    await this.listaRepository.deletarLista(id, usuarioId);
  }
}

export default ListaServiceImpl;