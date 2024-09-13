import Usuario from "../models/usuario.model";
import { UsuarioAtributos } from "../interface/usuario.interface";

class ContaRepository {

    public async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        return Usuario.findByPk(id);
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

export default new ContaRepository();
