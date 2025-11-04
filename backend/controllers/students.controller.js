
import * as studentService from '../services/students.service.js';

export async function listStudents(req, res) {
    try {
        let { page, perPage, gradeId, classId } = req.query;
        // adjust for 0-based index
        if (page == 0) {
            page = 1
        }

        const students = await studentService.listStudents({ skip: Number(perPage * (page - 1)) || 0, take: Number(perPage) || 50, gradeId, classId });
        // get total count matching filters (requires studentService.countStudents)
        const total = await studentService.countStudents();

        const response = {
            data: students,
            meta: {
                total,
                currentPage: Math.floor((Number(perPage * (page)) || 0) / (Number(perPage) || 50)) + 1,
                perPage: Number(perPage) || 50,
                totalPages: Math.ceil(total / (Number(perPage) || 50))
            }
        }
        return res.json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch students' });
    }
}

export async function getStudent(req, res) {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        return res.json(student);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch student' });
    }
}

export async function createStudent(req, res) {
    try {
        const payload = req.body;
        const created = await studentService.createStudent(payload);
        return res.status(201).json(created);
    } catch (err) {
        console.error(err);
        // handle common Prisma unique errors (email etc.)
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Unique constraint failed', target: err.meta?.target });
        }
        return res.status(400).json({ error: err.message || 'Failed to create student' });
    }
}

export async function updateStudent(req, res) {
    try {
        const updated = await studentService.updateStudent(req.params.id, req.body);
        return res.json(updated);
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') return res.status(404).json({ error: 'Student not found' });
        if (err.code === 'P2002') return res.status(409).json({ error: 'Unique constraint failed', target: err.meta?.target });
        return res.status(400).json({ error: err.message || 'Failed to update student' });
    }
}

export async function deleteStudent(req, res) {
    try {
        const deleted = await studentService.deleteStudent(req.params.id);
        return res.json({ ok: true, deleted });
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') return res.status(404).json({ error: 'Student not found' });
        return res.status(500).json({ error: 'Failed to delete student' });
    }
}


