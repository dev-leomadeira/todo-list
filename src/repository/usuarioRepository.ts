import Usuario from "../models/usuario.model";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../interface/usuario.interface";

class UsuarioRepository {
    public async criarUsuario(usuario: UsuarioAtributosCriacao): Promise<Usuario> {
        return Usuario.create(usuario);
    }

    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        return Usuario.findByPk(id);
    }

    public async buscarTodosUsuarios(): Promise<Usuario[]> {
        return Usuario.findAll();
    }

    public async atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<[number, Usuario[]]> {
        return Usuario.update(dadosAtualizados, {
            where: { id },
            returning: true
        });
    }

    public async deletarUsuario(id: number): Promise<number> {
        return Usuario.destroy({ where: { id } });
    }
}

export default UsuarioRepository;
