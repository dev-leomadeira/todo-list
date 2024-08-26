import { DataTypes, Model } from "sequelize";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../interface/usuario.interface";
import sequelize from "../config/database";
import Papel from "./papel.model";
import Lista from "./lista.model";

class Usuario extends Model<UsuarioAtributos, UsuarioAtributosCriacao> implements UsuarioAtributos {
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    papelId!: number;

    // Define o relacionamento com o modelo Papel
    public readonly papel?: Papel; // `papel` será uma instância de Papel
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    papelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Usuario",
    tableName: "usuario",
    timestamps: false
});

Usuario.belongsTo(Papel, {
    foreignKey: "papelId",
    as: "papel"
});

Papel.hasMany(Usuario, { // Um Papel tem muitos Usuarios
    foreignKey: "papelId",
    as: "usuarios" // Ajustado para plural, para refletir a relação
});

Usuario.hasMany(Lista, {
    foreignKey: "usuarioId",
    as: "listas" // Ajustado para plural
});

export default Usuario;
