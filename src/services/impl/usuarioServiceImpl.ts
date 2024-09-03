import UsuarioRepository from "../../repository/usuarioRepository";
import { UsuarioService } from "../usuarioService";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../../interface/usuario.interface";
import Usuario from "../../models/usuario.model";

class UsuarioServiceImpl implements UsuarioService {
    public async criarUsuario(usuario: UsuarioAtributosCriacao): Promise<Usuario> {
        try {
            const novoUsuario = await UsuarioRepository.criarUsuario(usuario);
            return novoUsuario;
        } catch (error) {
            throw new Error("Erro ao criar usuário.");
        }
    }

    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        try {
            const usuario = await UsuarioRepository.buscarUsuarioPorId(id);
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }
            return usuario;
        } catch (error) {
            throw new Error("Erro ao buscar usuário por ID.");
        }
    }

    public async buscarTodosUsuarios(): Promise<Usuario[]> {
        try {
            return await UsuarioRepository.buscarTodosUsuarios();
        } catch (error) {
            throw new Error("Erro ao buscar todos os usuários.");
        }
    }

    public async atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario | null> {
        try {
            const [linhasAtualizadas, usuariosAtualizados] = await UsuarioRepository.atualizarUsuario(id, dadosAtualizados);
            if (linhasAtualizadas === 0) {
                throw new Error("Usuário não encontrado para atualização.");
            }
            return usuariosAtualizados[0];
        } catch (error) {
            throw new Error("Erro ao atualizar usuário.");
        }
    }

    public async deletarUsuario(id: number): Promise<void> {
        try {
            const linhasDeletadas = await UsuarioRepository.deletarUsuario(id);
            if (linhasDeletadas === 0) {
                throw new Error("Usuário não encontrado para deleção.");
            }
        } catch (error) {
            throw new Error("Erro ao deletar usuário.");
        }
    }
}

export default UsuarioServiceImpl;