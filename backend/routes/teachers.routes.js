import express from 'express';
import {
    listTeachers, getTeacher, createTeacher, updateTeacher, deleteTeacher
} from '../controllers/teachers.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/roles.middeware.js';

const router = express.Router();


router.get('/', authMiddleware, isAdmin, listTeachers);
router.get('/:id', authMiddleware, isAdmin, getTeacher);
router.post('/', authMiddleware, isAdmin, createTeacher);
router.put('/:id', authMiddleware, isAdmin, updateTeacher);
router.delete('/:id', authMiddleware, isAdmin, deleteTeacher);

export default router;
