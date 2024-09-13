import { UsuarioAtributos } from "../interface/usuario.interface";
import Usuario from "../models/usuario.model";

export interface ContaService {
    buscarUsuarioPorId(id: number): Promise<Usuario | null>;
    atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario | null>;
    deletarUsuario(id: number): Promise<boolean>;
}