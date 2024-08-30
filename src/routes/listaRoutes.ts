import { Router } from "express";
import { ListaController } from "../controller/listaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/listas", authMiddleware, ListaController.criarLista);
router.get("/listas/usuario", authMiddleware, ListaController.buscarListasPorUsuario);
router.put("/listas/:id", authMiddleware, ListaController.atualizarLista);
router.delete("/listas/:id", authMiddleware, ListaController.deletarLista);

export default router;
