import { UsuarioAtributos, UsuarioAtributosCriacao } from "../interface/usuario.interface";
import Usuario from "../models/usuario.model";
export interface UsuarioService {
    criarUsuario(usuario: UsuarioAtributosCriacao): Promise<Usuario>;
    buscarUsuarioPorId(id: number): Promise<Usuario | null>;
    buscarTodosUsuarios(): Promise<Usuario[]>;
    atualizarUsuario(id: number, dadosAtualizados: Partial<UsuarioAtributos>): Promise<Usuario | null>;
    deletarUsuario(id: number): Promise<void>;
}