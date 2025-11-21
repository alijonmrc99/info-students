import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';
import prisma from './prisma/client.js';
import studentRoutes from './routes/students.route.js';
import teacherRoutes from './routes/teachers.routes.js';
import uploaRoutes from './routes/upload.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoutes from './routes/post.routes.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));


// uploads (static files)
app.use('/uploads', express.static('uploads'));

// health
app.get('/', (req, res) => res.send('API up'));

// auth
app.use('/api/auth', authRoutes);
// students
app.use('/api/students', studentRoutes);
// teachers
app.use('/api/teachers', teacherRoutes);
// upload route
app.use('/api/upload', uploaRoutes);
// post route
app.use('/api/post', postRoutes);


// protected example route
app.get('/api/me', authMiddleware, async (req, res) => {
    const includeParams = req.user.role === 'TEACHER' ? {

        teacher: {
            include: {
                grades: true
            }
        }
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
