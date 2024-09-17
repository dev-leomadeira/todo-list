import UsuarioRepository from "../../repository/usuarioRepository";
import { UsuarioService } from "../usuarioService";
import { UsuarioAtributos, UsuarioAtributosCriacao } from "../../interface/usuario.interface";
import Usuario from "../../models/usuario.model";
import bcrypt from "bcryptjs";

class UsuarioServiceImpl implements UsuarioService {

    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async criarUsuario(dadosUsuario: UsuarioAtributosCriacao): Promise<Usuario> {
        const { nome, email, senha } = dadosUsuario;
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await this.usuarioRepository.criarUsuario({
            nome,
            email,
            senha: senhaCriptografada,
            papelId: 2
        });
        return novoUsuario;
    }

  public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.buscarUsuarioPorId(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }

  public async buscarTodosUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.buscarTodosUsuarios();
  }

  public async atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario | null> {
    const [linhasAtualizadas, usuariosAtualizados] =
      await this.usuarioRepository.atualizarUsuario(id, dadosAtualizados);
    if (linhasAtualizadas === 0) {
      throw new Error("Usuário não encontrado para atualização.");
    }
    return usuariosAtualizados[0];
  }

  public async deletarUsuario(id: number): Promise<void> {
    const linhasDeletadas = await this.usuarioRepository.deletarUsuario(id);
    if (linhasDeletadas === 0) {
      throw new Error("Usuário não encontrado para deleção.");
    }
  }
}

export default UsuarioServiceImpl;