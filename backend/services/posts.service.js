import prisma from '../prisma/client.js';


export const createPostSer = async ({ title, content, imagePath }) => {
    return await prisma.posts.create({
        data: { title, content, imagePath },
    });
};

export const getAllPost = async () => {
    return await prisma.posts.findMany();
};

export const getOnePost = async (id) => {
    return await prisma.posts.findUnique({ where: { id } });
};

export const updatePostSer = async (id, { title, content, imagePath }) => {
    const old = await prisma.posts.findUnique({ where: { id } });
    if (!old) throw new Error("Post not found");

    // if new image, delete old image
    if (imagePath && old.imagePath) {
        deleteFile(old.imagePath);
    }

    return await prisma.posts.update({
        where: { id },
        data: { title, content, imagePath },
    });
};

export const deletePostSer = async (id) => {
    const post = await prisma.posts.findUnique({ where: { id } });
    if (!post) throw new Error("Post not found");

    // delete file from storage
    if (post.imagePath) {
        deleteFile(post.imagePath);
    }

    // delete from DB
    return await prisma.posts.delete({ where: { id } });
};
