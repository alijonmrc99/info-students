import express from 'express';
import { register, login, refresh, logoutController } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', authMiddleware, register);
router.post('/refresh', authMiddleware, refresh);
router.post('/logout', logoutController);

export default router;
