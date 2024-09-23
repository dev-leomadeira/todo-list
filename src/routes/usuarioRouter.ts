import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/usuarios", authMiddleware, isAdmin, UsuarioController.criarUsuario);
router.get("/usuarios", authMiddleware, isAdmin,  UsuarioController.buscarTodosUsuarios);
router.get("/usuarios/:id", authMiddleware, isAdmin,  UsuarioController.buscarUsuarioPorId);
router.put("/usuarios/:id", authMiddleware, isAdmin,  UsuarioController.atualizarUsuario);
router.delete("/usuarios/:id", authMiddleware, isAdmin,  UsuarioController.deletarUsuario);

export default router;
