import { Optional } from "sequelize";

export interface AnuncioAtributos{
    id: number,
    imagemUrl: string,
    scriptAdsense: string,
    ativo: boolean,
    admin_id: number
}

export interface AnuncioAtributosCriacao extends Optional<AnuncioAtributos, "id">{}