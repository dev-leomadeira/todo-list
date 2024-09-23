import { Router } from "express";
import { ListaController } from "../controller/listaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/listas", authMiddleware, ListaController.criarLista);
router.get("/listas", authMiddleware, ListaController.buscarTodosListas);
router.get("/listas/:id", authMiddleware, ListaController.buscarListaPorId);
router.put("/listas/:id", authMiddleware, ListaController.atualizarLista);
router.delete("/listas/:id", authMiddleware, ListaController.deletarLista);

export default router;
