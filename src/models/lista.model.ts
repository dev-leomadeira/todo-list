import { DataTypes, Model } from "sequelize";
import { ListaAtributoCriacao, ListaAtributos } from "../interface/lista.interface";
import sequelize from "../config/database";
import Usuario from "./usuario.model";
class Lista extends Model<ListaAtributos, ListaAtributoCriacao> implements ListaAtributos {
    id!: number;
    nome!: string;
    dataCriacao!: Date;
    usuarioId!: number;
};

Lista.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Lista",
    tableName: "lista",
    timestamps: false
});

Usuario.hasMany(Lista, {
    foreignKey: "usuarioId",
    as: "listas" // Ajustado para plural
});

Lista.belongsTo(Usuario, {
    foreignKey: "usuarioId",
    as: "usuario"
});

export default Lista;