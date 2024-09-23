import usuarioRepository from "../../repository/usuarioRepository";
import { UsuarioService } from "../usuarioService";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../../interface/usuario.interface";
import Usuario from "../../models/usuario.model";
import bcrypt from "bcryptjs";

class UsuarioServiceImpl implements UsuarioService {

  async criarUsuario(usuario: UsuarioAtributosCriacao): Promise<Usuario> {
      try {
        return await usuarioRepository.criarUsuario(usuario)
      } catch (error) {
        throw new Error(`Erro ao criar o usuario`)
      }
  }

  async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    return await usuarioRepository.buscarUsuarioPorId(id);
  }

  async buscarTodosUsuarios(): Promise<Usuario[]> {
    return await usuarioRepository.buscarTodosUsuarios();
  }

  async atualizarUsuario(id: number, usuario: Partial<UsuarioAtributos>): Promise<Usuario | null> {
    const existingUser = await usuarioRepository.buscarUsuarioPorId(id);

    if (!existingUser) {
        throw new Error("Usário não encontrado");
    }

    if (usuario.senha) {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }

    return await usuarioRepository.atualizarUsuario(id, usuario);
  }

  async deletarUsuario(id: number): Promise<void> {
    const userDelete = await usuarioRepository.buscarUsuarioPorId(id);
        
    if (!userDelete) { // Check if the user exists
        throw new Error("Usuário não encontrado");
    }

    await usuarioRepository.deletarUsuario(id);    
  }
}

export default new UsuarioServiceImpl();