import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// GET /api/users/profile - Requiere autenticación
router.get('/profile', authMiddleware, (req, res) => userController.getProfile(req, res));

export default router;

