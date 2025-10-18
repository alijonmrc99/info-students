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

const router = express.Router();
const upload = uploadSingle('postFiles');

router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

export default router;
