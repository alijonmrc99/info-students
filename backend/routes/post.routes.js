// routes/postRoutes.js
import express from 'express';
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} from '../controllers/post.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdminOrTeacher } from '../middleware/roles.middeware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', authMiddleware, isAdminOrTeacher, createPost);
router.put('/:id', authMiddleware, isAdminOrTeacher, updatePost);
router.delete('/:id', authMiddleware, isAdminOrTeacher, deletePost);

export default router;
