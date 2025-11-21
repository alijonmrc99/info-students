import express from 'express';
import { register, login, refresh, logoutController, update, updateById, users, getById, deleteById } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/roles.middeware.js';

const router = express.Router();

router.get('/users', authMiddleware, isAdmin, users);
router.post('/users', authMiddleware, isAdmin, register);
router.put('/users/:id', authMiddleware, isAdmin, updateById);
router.get('/users/:id', authMiddleware, isAdmin, getById);
router.delete('/users/:id', authMiddleware, isAdmin, deleteById);

router.post('/login', login);
router.post('/update', authMiddleware, update);
router.post('/refresh', authMiddleware, refresh);
router.post('/logout', logoutController);

export default router;
