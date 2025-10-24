import { registerUser, loginUser, refreshAccessToken, logout, updateUser, updateUserById } from '../services/auth.service.js';
import dotenv from 'dotenv';
dotenv.config();

const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || 'refreshToken';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: (process.env.REFRESH_TOKEN_EXPIRES_DAYS ? Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) : 30) * 24 * 60 * 60 * 1000
};

export async function register(req, res) {
    try {
        const { email, password, fullName, phone, role, teacherId } = req.body;
        const user = await registerUser({ email, password, fullName, phone, role, teacherId });
        return res.status(201).json({ user });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function update(req, res) {
    try {
        const { password, fullName, phone } = req.body;

        const id = req.user.id
        const user = await updateUser({ id, password, fullName, phone });
        return res.status(201).json({ user });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function updateById(req, res) {
    try {
        const { password, fullName, phone, email, teacherId, role } = req.body;
        const { id } = req.params

        const user = await updateUserById({ id, password, fullName, phone, role, teacherId, email });
        return res.status(201).json({ user });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const { user, accessToken, refreshToken } = await loginUser({ email, password });

        // set refresh token as HttpOnly cookie
        res.cookie(REFRESH_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);

        return res.json({ user, accessToken });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}

export async function refresh(req, res) {
    try {
        const token = req.cookies[REFRESH_COOKIE_NAME];
        if (!token) return res.status(401).json({ error: 'No refresh token' });

        const { accessToken, refreshToken, user } = await refreshAccessToken(token);

        // set rotated refresh token cookie
        res.cookie(REFRESH_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
        return res.json({ accessToken, user });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}


export async function logoutController(req, res) {
    try {
        const token = req.cookies[REFRESH_COOKIE_NAME];
        if (token) {
            await logout(token);
            // clear cookie
            res.clearCookie(REFRESH_COOKIE_NAME, { path: '/' });
        }
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
