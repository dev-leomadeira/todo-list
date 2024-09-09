import { DataTypes, Model } from "sequelize";
import { AnuncioAtributos, AnuncioAtributosCriacao } from "../interface/anuncio.intereface";
import sequelize from "../config/database";
import Usuario from "./usuario.model";

class Anuncio extends Model<AnuncioAtributos, AnuncioAtributosCriacao> implements AnuncioAtributos {
    id!: number;
    imagemUrl!: string;
    scriptAdsense!: string;
    ativo!: boolean;
    usuarioId!: number;
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
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Anuncio",
    tableName: "anuncio",
    timestamps: false
})

Usuario.hasMany(Anuncio, {
    foreignKey: "usuarioId",
    as: "anuncios"
});

Anuncio.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario"
});

export default Anuncio