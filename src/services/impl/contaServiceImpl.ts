import ContaRepository from "../../repository/contaRepository";
import { UsuarioAtributos } from "../../interface/usuario.interface";
import Usuario from "../../models/usuario.model";
import { ContaService } from "../contaService";
class ContaServiceImpl implements ContaService {

  private contaRepository: ContaRepository;

  constructor() {
    this.contaRepository = new ContaRepository();
  }

  async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.contaRepository.buscarUsuarioPorId(id);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    return usuario;
  }
  async atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario | null> {
    const [linhasAtualizadas, usuariosAtualizados] = await this.contaRepository.atualizarUsuario(id, dadosAtualizados);
    if (linhasAtualizadas === 0) {
      throw new Error("Usuário não encontrado para atualização.");
    }
    return usuariosAtualizados[0];
  }
  async deletarUsuario(id: number): Promise<boolean> {
    try {
      const linhasDeletadas = await this.contaRepository.deletarUsuario(id);
      return linhasDeletadas > 0 ? true : false;
    } catch (error) {
      throw new Error("Erro ao deletar usuário.");
    }
  }
}

export default ContaServiceImpl;
