import { ListaAtributoCriacao, ListaAtributos } from "../interface/lista.interface";
import Lista from "../models/lista.model";

export interface ListaService {
  criarLista(lista: ListaAtributoCriacao): Promise<Lista>;
  buscarTodasListas(): Promise<Lista[]>;
  buscarListaPorId(id: number): Promise<Lista | null>;
  atualizarLista(id: number, lista: Partial<ListaAtributos>): Promise<Lista | null>;
  deletarLista(id: number): Promise<void>;
}