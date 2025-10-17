import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import prisma from './prisma/client.js';
import studentRoutes from './routes/students.route.js';
import teacherRoutes from './routes/teachers.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// health
app.get('/', (req, res) => res.send('API up'));

// auth
app.use('/api/auth', authRoutes);
// students
app.use('/api/students', studentRoutes);
// teachers
app.use('/api/teachers', teacherRoutes);

// protected example route
app.get('/api/profile', authMiddleware, async (req, res) => {
    const includeParams = req.user.role === 'TEACHER' ? {
        teacher: true
    } : {};

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: includeParams
    });
    delete user.password;
    res.json({ user });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
