import crypto from 'crypto';
import prisma from '../prisma/client.js';
import ms from 'ms'; // optional small helper; if you don't want it, use manual Date math

// If you don't want ms, remove and compute expiry manually.
// npm install ms  (optional)
const REFRESH_TOKEN_EXPIRES_DAYS = process.env.REFRESH_TOKEN_EXPIRES_DAYS ? Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) : 30;

export async function createRefreshToken(userId) {
    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

    const rt = await prisma.refreshToken.create({
        data: {
            token,
            userId,
            expiresAt,
        }
    });

    return rt;
}

export async function revokeRefreshToken(token) {
    const existing = await prisma.refreshToken.findUnique({ where: { token } });
    if (!existing) return null;
    const revoked = await prisma.refreshToken.update({
        where: { token },
        data: { revoked: true }
    });
    return revoked;
}

export async function findValidRefreshToken(token) {
    const rt = await prisma.refreshToken.findUnique({ where: { token } });
    if (!rt) return null;
    if (rt.revoked) return null;
    if (rt.expiresAt < new Date()) return null;
    return rt;
}
