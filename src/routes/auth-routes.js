import { Router } from 'express';
import authController from '../controllers/auth-controller.js';
import auth from '../middleware/auth.js';
const router = Router();

router.post('/', authController.login);

router.get('/', auth, authController.logout);


export default router;