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

    async buscarListaPorId(id: number): Promise<Lista | null> {
        try {
            const lista = await Lista.findByPk(id);
            return lista;
        } catch (error) {
            throw new Error("Erro ao buscar lista por ID");
        }
    }

    async atualizarLista(id: number, novoNome: string): Promise<void> {
        await this.listaRepository.atualizarLista(id, novoNome);
    }

    async deletarLista(id: number, usuarioId: number): Promise<void> {
        try {
            const lista = await Lista.findByPk(id);
            if (!lista) {
                throw new Error("Lista não encontrada");
            }
            if (lista.usuarioId !== usuarioId) {
                throw new Error("Você não tem permissão para deletar esta lista");
            }
            await lista.destroy();
        } catch (error) {
            throw new Error("Erro ao deletar lista");
        }
    }
}

export default ListaServiceImpl;