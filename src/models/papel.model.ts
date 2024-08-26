import { DataTypes, Model } from "sequelize";
import { PapelAtributos, PapelAtributosCriacao } from "../interface/papel.interface";
import sequelize from "../config/database";
import Usuario from "./usuario.model";

class Papel extends Model<PapelAtributos, PapelAtributosCriacao> implements PapelAtributos {
    id!: number;
    nome!: string;

    // Define o relacionamento com o modelo Usuario
    public readonly usuarios?: Usuario[]; // `usuarios` será um array de Usuarios
}

Papel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: "Papel",
    tableName: "papel",
    timestamps: false
});

export default Papel;