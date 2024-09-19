import { Optional } from "sequelize";

export interface ListaAtributos{
    id: number,
    nome: string,
    dataCriacao: Date,
    usuarioId: number
}

export interface ListaAtributoCriacao extends Optional<ListaAtributos, 'id' | 'dataCriacao'>{}