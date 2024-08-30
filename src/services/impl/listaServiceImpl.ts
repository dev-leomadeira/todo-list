import Lista from "../../models/lista.model";
import ListaRepository from "../../repository/listaRepository";
import { ListaService } from "../listaService";

class ListaServiceImpl implements ListaService {

    private listaRepository: ListaRepository;

    constructor(){
        this.listaRepository = new ListaRepository();
    }

    async criarLista(dados: { nome: string; usuarioId: number; }): Promise<Lista> {
        return await this.listaRepository.criarLista({nome: dados.nome, usuarioId: dados.usuarioId, dataCriacao: new Date()});    
    }
    async buscarListasPorUsuario(usuarioId: number): Promise<Lista[]> {
        return await this.listaRepository.buscarListaPorUsuario(usuarioId);
    }
    async atualizarLista(id: number, novoNome: string): Promise<void> {
        await this.listaRepository.atualizarLista(id, novoNome);
    }
    async deletarLista(id: number, usuarioId: number): Promise<void> {
        await this.listaRepository.deletarLista(id, usuarioId);
    }
}

export default ListaServiceImpl;