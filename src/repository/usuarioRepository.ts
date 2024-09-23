import Usuario from "../models/usuario.model";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../interface/usuario.interface";

class UsuarioRepository {
    async criarUsuario(usuario: UsuarioAtributosCriacao): Promise<Usuario> {
        return Usuario.create(usuario);
    }

    async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        return Usuario.findByPk(id);
    }

    async buscarTodosUsuarios(): Promise<Usuario[]> {
        return Usuario.findAll();
    }

    async atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario> {
        const existeUsuario = await this.buscarUsuarioPorId(id);
        if (!existeUsuario) {
            throw new Error("Usário não encontrado.");
        }
        return await existeUsuario.update(dadosAtualizados);
    }

    async deletarUsuario(id: number): Promise<void> {
        const existeUsuario = await this.buscarUsuarioPorId(id);
        if (!existeUsuario) {
            throw new Error(`Usuario com o id ${id} não encontrado.`);
        }
        await existeUsuario.destroy();
    }
}

export default new UsuarioRepository();
