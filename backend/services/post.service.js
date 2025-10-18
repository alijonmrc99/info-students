
import prisma from '../prismaClient.js';
import { deleteFile } from '../utils/deleteFile.js';

export const postService = {
    create: async ({ title, content, imagePath }) => {
        return await prisma.post.create({
            data: { title, content, imagePath },
        });
    },

    getAll: async () => {
        return await prisma.post.findMany();
    },

    getOne: async (id) => {
        return await prisma.post.findUnique({ where: { id } });
    },

    update: async (id, { title, content, imagePath }) => {
        const old = await prisma.post.findUnique({ where: { id } });
        if (!old) throw new Error("Post not found");

        // if new image, delete old image
        if (imagePath && old.imagePath) {
            deleteFile(old.imagePath);
        }

        return await prisma.post.update({
            where: { id },
            data: { title, content, imagePath },
        });
    },

    delete: async (id) => {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) throw new Error("Post not found");

        // delete file from storage
        if (post.imagePath) {
            deleteFile(post.imagePath);
        }

        // delete from DB
        return await prisma.post.delete({ where: { id } });
    },
};
