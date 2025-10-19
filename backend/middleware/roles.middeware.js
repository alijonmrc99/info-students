// middleware/roleMiddleware.js

export function isAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Admin access only' });
    }
    next();
}

export function isTeacher(req, res, next) {
    if (!req.user || req.user.role !== 'TEACHER') {
        return res.status(403).json({ error: 'Teacher access only' });
    }
    next();
}

// Optional: Admin OR Teacher
export function isAdminOrTeacher(req, res, next) {
    if (!req.user || !['ADMIN', 'TEACHER'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}
