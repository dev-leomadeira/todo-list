import { Router } from "express";
import { TarefaController } from "../controller/tarefaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/tarefas", authMiddleware, TarefaController.criarTarefa);
router.get("/tarefas", authMiddleware, TarefaController.buscarTodosTarefas);
router.get("/tarefas/:id", authMiddleware, TarefaController.buscarTarefaPorId);
router.put("/tarefas/:id", authMiddleware, TarefaController.atualizarTarefa);
router.delete("/tarefas/:id", authMiddleware, TarefaController.deletarTarefa);

export default router;
