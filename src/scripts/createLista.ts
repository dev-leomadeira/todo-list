import sequelize from "../config/database";
import Usuario from "../models/usuario.model";
import Lista from "../models/lista.model";

const createLista = async () => {
    try {
        
        // Encontre um usuário existente
        const usuario = await Usuario.findOne({ where: { id: 1 } }); // Substitua pelo ID do usuário desejado

        if (!usuario) {
            console.log("Usuário não encontrado.");
            return;
        }

        // Cria uma lista associada ao usuário encontrado
        const lista = await Lista.create({
            nome: "Minha Nova Lista",
            dataCriacao: new Date(),
            usuarioId: usuario.id
        });

        console.log("Lista criada:", lista.toJSON());
    } catch (error) {
        console.error("Erro ao criar lista:", error);
    }
};

createLista();
