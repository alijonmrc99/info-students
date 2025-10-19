import express from 'express';
import {
    listStudents, getStudent, createStudent, updateStudent, deleteStudent
} from '../controllers/students.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { isAdmin, isAdminOrTeacher } from '../middleware/roles.middeware.js';

const router = express.Router();

router.get('/', listStudents);
router.get('/:id', getStudent);
router.post('/', authMiddleware, authMiddleware, isAdmin, createStudent);
router.put('/:id', authMiddleware, isAdmin, updateStudent);
router.delete('/:id', authMiddleware, isAdmin, deleteStudent);

export default router;
