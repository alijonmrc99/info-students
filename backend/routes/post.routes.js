// routes/postRoutes.js
import express from 'express';
import { uploadSingle } from '../utils/uploadSingle.js';
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdminOrTeacher } from '../middleware/roles.middeware.js';

const router = express.Router();
const upload = uploadSingle('postFiles');

router.get('/', authMiddleware, isAdminOrTeacher, getPosts);
router.get('/:id', authMiddleware, isAdminOrTeacher, getPost);
router.put('/:id', authMiddleware, isAdminOrTeacher, upload.single('image'), updatePost);
router.delete('/:id', authMiddleware, isAdminOrTeacher, deletePost);

export default router;
