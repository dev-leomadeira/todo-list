import ContaRepository from "../../repository/contaRepository";
import { UsuarioAtributos } from "../../interface/usuario.interface";
import Usuario from "../../models/usuario.model";
import { ContaService } from "../contaService";
class ContaServiceImpl implements ContaService {
  async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
    try {
      const usuario = await ContaRepository.buscarUsuarioPorId(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado.");
      }
      return usuario;
    } catch (error) {
      throw new Error("Erro ao buscar usuário por IDdddz.");
    }
  }
  async atualizarUsuario(
    id: number,
    dadosAtualizados: Partial<UsuarioAtributos>
  ): Promise<Usuario | null> {
    try {
      const [linhasAtualizadas, usuariosAtualizados] =
        await ContaRepository.atualizarUsuario(id, dadosAtualizados);
      if (linhasAtualizadas === 0) {
        throw new Error("Usuário não encontrado para atualização.");
      }
      return usuariosAtualizados[0];
    } catch (error) {
      throw new Error("Erro ao atualizar usuário.");
    }
  }
  async deletarUsuario(id: number): Promise<boolean> {
    try {
      const linhasDeletadas = await ContaRepository.deletarUsuario(id);
      return linhasDeletadas > 0 ? true : false;
    } catch (error) {
      throw new Error("Erro ao deletar usuário.");
    }
  }
}

export default ContaServiceImpl;
