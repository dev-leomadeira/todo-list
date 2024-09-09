import { DataTypes, Model } from "sequelize";
import { PapelAtributos, PapelAtributosCriacao } from "../interface/papel.interface";
import sequelize from "../config/database";
class Papel extends Model<PapelAtributos, PapelAtributosCriacao> implements PapelAtributos {
    id!: number;
    nome!: string;
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