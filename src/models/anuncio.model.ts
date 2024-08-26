import { DataTypes, Model } from "sequelize";
import { AnuncioAtributos, AnuncioAtributosCriacao } from "../interface/anuncio.interface";
import sequelize from "../config/database";

class Anuncio extends Model<AnuncioAtributos, AnuncioAtributosCriacao> implements AnuncioAtributos {
    id!: number;
    imagemUrl!: string;
    scriptAdsense!: string;
    ativo!: boolean;
    admin_id!: number;
}

Anuncio.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imagemUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scriptAdsense: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Anuncio",
    tableName: "anuncio",
    timestamps: false
})

export default Anuncio