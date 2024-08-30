import Lista from "../models/lista.model";

export interface ListaService {
  criarLista(dados: { nome: string, usuarioId: number }): Promise<Lista>;
  buscarListasPorUsuario(usuarioId: number): Promise<Lista[]>;
  atualizarLista(id: number, novoNome: string): Promise<void>;
  deletarLista(id: number, usuarioId: number): Promise<void>;
}