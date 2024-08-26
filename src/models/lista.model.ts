import { DataTypes, Model } from "sequelize";
import { ListaAtributoCriacao, ListaAtributos } from "../interface/lista.interface";
import sequelize from "../config/database";
import Usuario from "./usuario.model";
import Tarefa from "./tarefa.model";

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
    timestamps: true
});

// Lista.belongsTo(Usuario, {
//     foreignKey: "usuarioId",
//     as: "usuario"
// });

// Lista.hasMany(Tarefa, {
//     foreignKey: "listaId",
//     as: "tarefa"
// });

export default Lista;