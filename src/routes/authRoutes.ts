import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { validateRegisterInput, validateLoginInput } from '../controller/authController';

const router = Router();

router.post('/registrar', validateRegisterInput, AuthController.register);
router.post('/logar', validateLoginInput, AuthController.login);

export default router;
