import { DataTypes, Model } from "sequelize";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../interface/usuario.interface";
import sequelize from "../config/database";
import Papel from "./papel.model";
// import Lista from "./lista.model";
class Usuario extends Model<UsuarioAtributos, UsuarioAtributosCriacao> implements UsuarioAtributos {
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    papelId!: number;
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

// Defina o relacionamento após a definição dos modelos
Papel.hasMany(Usuario, {
    foreignKey: "papelId",
    as: "usuarios"
});

Usuario.belongsTo(Papel, {
    foreignKey: "papelId",
    as: "papel"
});

export default Usuario;