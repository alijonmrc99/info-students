import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import { createRefreshToken, revokeRefreshToken, findValidRefreshToken } from './token.service.js';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES_IN || '15m';

export async function registerUser({ email, password, fullName, phone, role = 'ADMIN', studentId = null, teacherId = null }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            fullName,
            phone,
            role,
            studentId,
            teacherId
        },
        select: { id: true, email: true, fullName: true, phone: true, role: true, createdAt: true }
    });
    return user;
}

export function generateAccessToken(user) {
    // user: { id, email, role, ... }
    const payload = { userId: user.id, role: user.role };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    // create refresh token
    const refreshToken = await createRefreshToken(user.id);
    const accessToken = generateAccessToken(user);

    // Return safe user + tokens (do not return password)
    const { password: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken: refreshToken.token };
}

export async function refreshAccessToken(refreshTokenString) {
    const rt = await findValidRefreshToken(refreshTokenString);
    if (!rt) throw new Error('Invalid refresh token');

    const user = await prisma.user.findUnique({ where: { id: rt.userId } });
    if (!user) throw new Error('User not found for token');

    // optionally rotate: revoke current and issue new
    await revokeRefreshToken(refreshTokenString);
    const newRt = await createRefreshToken(user.id);
    const newAccess = generateAccessToken(user);
    return { accessToken: newAccess, refreshToken: newRt.token, user: { id: user.id, email: user.email, role: user.role } };
}

export async function logout(refreshTokenString) {
    await revokeRefreshToken(refreshTokenString);
}
