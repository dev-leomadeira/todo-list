import { Optional } from "sequelize";

export interface TarefaAtributos {
    id: number;
    descricao: string;
    concluida: boolean;
    dataCriacao: Date;
    listaId: number;
}

export interface TarefaAtributoCriacao extends Optional<TarefaAtributos, "id"> {}