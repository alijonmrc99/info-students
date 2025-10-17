import express from 'express';
import { register, login, refresh, logoutController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logoutController);

export default router;
