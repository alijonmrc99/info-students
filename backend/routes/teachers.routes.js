import express from 'express';
import {
    listTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher
} from '../controllers/teachers.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, listTeachers);
router.get('/:id', authMiddleware, getTeacher);
router.post('/', authMiddleware, createTeacher);
router.put('/:id', authMiddleware, updateTeacher);
router.delete('/:id', authMiddleware, deleteTeacher);

export default router;
