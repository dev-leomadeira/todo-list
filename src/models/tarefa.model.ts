import { DataTypes, Model } from "sequelize";
import { TarefaAtributoCriacao, TarefaAtributos } from "../interface/tarefa.interface";
import sequelize from "../config/database";
import Lista from "./lista.model";

class Tarefa extends Model<TarefaAtributos, TarefaAtributoCriacao> implements TarefaAtributos{
    id!: number;
    descricao!: string;
    concluida!: boolean;
    dataCriacao!: Date;
    listaId!: number;
}

Tarefa.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    listaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Tarefa",
    tableName: "tarefa",
    timestamps: false
});

Lista.hasMany(Tarefa, {
    foreignKey: "listaId",
    as: "tarefa"
});

Tarefa.belongsTo(Lista, {
    foreignKey: "listaId",
    as: "lista"
});

export default Tarefa;