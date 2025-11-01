import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import { createRefreshToken, revokeRefreshToken, findValidRefreshToken } from './token.service.js';
import dotenv from 'dotenv';
dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || 10);
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRES_IN || '15m';

export async function registerUser({ email, password, fullName, phone, role = 'ADMIN', teacherId = null }) {
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
            teacherId
        },
        select: { id: true, email: true, fullName: true, phone: true, role: true, createdAt: true }
    });
    return user;
}

export async function updateUser({ id, password, fullName, phone }) {

    const payload = {};
    if (password !== undefined) {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        payload.password = hashed
    }
    if (fullName !== undefined) payload.email = fullName;
    if (phone !== undefined) payload.phone = phone;

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: payload,
        select: { id: true, email: true, fullName: true, phone: true, role: true, createdAt: true }
    });
    return user;
}
export async function getUserById({ id }) {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: { id: true, email: true, fullName: true, phone: true, role: true, createdAt: true }
    });
    return user;
}
export async function updateUserById({ id, email, password, fullName, phone, role, teacherId }) {

    const payload = {};
    if (password !== undefined) {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        payload.password = hashed
    }
    if (fullName !== undefined) payload.fullName = fullName;
    if (phone !== undefined) payload.phone = phone;
    if (role !== undefined) payload.role = role;
    if (email !== undefined) payload.email = email;
    if (teacherId !== undefined) payload.teacherId = teacherId;



    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: payload,
        select: { id: true, email: true, fullName: true, phone: true, role: true, createdAt: true }
    });
    return user;
}



export function generateAccessToken(user) {
    const payload = { userId: user.id, role: user.role };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}


export async function getUsers() {
    const users = await prisma.user.findMany({});

    return {
        data: users
    };
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


