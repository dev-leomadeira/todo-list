import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/usuarios", authMiddleware, UsuarioController.criarUsuario);
router.get("/usuarios/:id", authMiddleware, UsuarioController.buscarUsuarioPorId);
router.get("/usuarios", authMiddleware, UsuarioController.buscarTodosUsuarios);
router.put("/usuarios/:id", authMiddleware, UsuarioController.atualizarUsuario);
router.delete("/usuarios/:id", authMiddleware, UsuarioController.deletarUsuario);

export default router;
