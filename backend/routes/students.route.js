import express from 'express';
import {
    listStudents, getStudent, createStudent, updateStudent, deleteStudent
} from '../controllers/students.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', listStudents);
router.get('/:id', getStudent);
router.post('/', authMiddleware, createStudent);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

export default router;
