import { Router } from "express";
import { ListaController } from "../controller/listaController";

const router = Router();

router.post("/listas", ListaController.criarLista); // Rota para criar uma nova lista
router.get("/listas/usuario/:usuarioId", ListaController.buscarListasPorUsuario); // Rota para buscar todas as listas de um usuário
router.put("/listas/:id", ListaController.atualizarLista); // Rota para atualizar o nome de uma lista
router.delete("/listas/:id/usuario/:usuarioId", ListaController.deletarLista); // Rota para deletar uma lista

export default router;
