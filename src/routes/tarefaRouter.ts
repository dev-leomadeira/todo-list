import { Router } from "express";
import { TarefaController } from "../controller/tarefaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/tarefas", authMiddleware, TarefaController.criarTarefa);
router.get("/tarefas/lista/:listaId", authMiddleware, TarefaController.buscarTarefasPorLista);
router.put("/tarefas/:id", authMiddleware, TarefaController.atualizarTarefa);
router.delete("/tarefas/:id/lista/:listaId", authMiddleware, TarefaController.deletarTarefa);

export default router;
