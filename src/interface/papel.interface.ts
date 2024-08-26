import { Optional } from "sequelize";

export interface PapelAtributos{
    id: number;
    nome: string;
}

export interface PapelAtributosCriacao extends Optional<PapelAtributos, 'id'> {}