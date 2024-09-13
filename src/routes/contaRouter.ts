import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContaController } from "../controller/contaController";

const router = Router();

router.get("/usuario/conta", authMiddleware, ContaController.visualizarConta);
router.put("/usuario/conta", authMiddleware, ContaController.atualizarConta);
router.delete("/usuario/conta", authMiddleware, ContaController.deletarConta);

export default router;
