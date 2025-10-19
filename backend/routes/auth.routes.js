import express from 'express';
import { register, login, refresh, logoutController, update, updateById } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/roles.middeware.js';

const router = express.Router();

router.post('/login', login);
router.post('/update', authMiddleware, update);
router.post('/update/:id', authMiddleware, isAdmin, updateById);
router.post('/register', authMiddleware, isAdmin, register);
router.post('/refresh', authMiddleware, refresh);
router.post('/logout', logoutController);

export default router;
