import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization required' });
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, JWT_SECRET);
        console.log(payload);

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, role: true, fullName: true }
        });
        if (!user) return res.status(401).json({ error: 'Invalid token' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
