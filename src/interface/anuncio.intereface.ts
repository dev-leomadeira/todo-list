import { Optional } from "sequelize";

export interface AnuncioAtributos{
    id: number,
    imagemUrl: string,
    scriptAdsense: string,
    ativo: boolean,
    usuarioId: number
}

export interface AnuncioAtributosCriacao extends Optional<AnuncioAtributos, "id">{}