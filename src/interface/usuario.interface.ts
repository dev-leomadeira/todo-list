import { Optional } from "sequelize";

export interface UsuarioAtributos {
    id: number;
    nome: string;
    email: string;
    senha: string;
    papelId: number;
}

export interface UsuarioAtributosCriacao extends Optional<UsuarioAtributos, 'id' | 'nome'> {}