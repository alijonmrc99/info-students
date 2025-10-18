import * as hrService from '../services/techers.service.js';

export async function listTeachers(req, res) {
    try {
        const teachers = await hrService.listTeachers({ skip: Number(req.query.skip) || 0, take: Number(req.query.take) || 50 });
        return res.json(teachers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch teachers' });
    }
}

export async function getTeacher(req, res) {
    try {
        const teacher = await hrService.getTeacherById(req.params.id);
        if (!teacher) return res.status(404).json({ error: 'Teacher not found' });
        return res.json(teacher);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch teacher' });
    }
}

export async function createTeacher(req, res) {
    try {

        const created = await hrService.createTeacher({ ...req.body });

        return res.status(201).json(created);
    } catch (err) {
        console.error(err);
        if (err.code === 'P2002') return res.status(409).json({ error: 'Class already has a teacher or unique conflict', details: err.meta?.target });
        return res.status(400).json({ error: err.message || 'Failed to create teacher' });
    }
}

export async function updateTeacher(req, res) {
    try {
        console.log(req.body);

        const updated = await hrService.updateTeacher(req.params.id, req.body);
        return res.json(updated);
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') return res.status(404).json({ error: 'Teacher not found' });
        if (err.code === 'P2002') return res.status(409).json({ error: 'Unique constraint failed', target: err.meta?.target });
        return res.status(400).json({ error: err.message || 'Failed to update teacher' });
    }
}

export async function deleteTeacher(req, res) {
    try {
        const deleted = await hrService.deleteTeacher(req.params.id);
        return res.json({ ok: true, deleted });
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') return res.status(404).json({ error: 'Teacher not found' });
        return res.status(500).json({ error: 'Failed to delete teacher' });
    }
}
