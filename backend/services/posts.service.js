import prisma from '../prisma/client.js';
import { deleteFile } from '../utils/delete.js';


export const createPostSer = async ({ title, content, imageId, gradeId }) => {

    const payload = {
        title,
        content,
    }

    if (imageId) payload.image = { connect: { id: Number(imageId) } };
    if (gradeId) payload.grade = { connect: { id: Number(gradeId) } };


    return await prisma.posts.create({ data: payload });
};

export const getAllPost = async ({ skip = 0, take = 50, }) => {
    return await prisma.posts.findMany({
        skip,
        take,
        include: { grade: true, image: true }
    });
};

export async function countPosts() {
    return prisma.posts.count({});
}

export const getOnePost = async (id) => {
    return await prisma.posts.findUnique({
        where: { id },
        include: { image: true }
    });
};

export const updatePostSer = async (id, data) => {

    const payload = {}
    if (data.title) payload.title = data.title
    if (data.content) payload.content = data.content

    if (data.imageId) payload.image = { connect: { id: Number(data.imageId) } }
    if (data.gradeId) payload.grade = { connect: { id: Number(data.gradeId) } }

    const old = await prisma.posts.findUnique({ where: { id } });
    if (!old) throw new Error("Post not found");

    // if new image, delete old image
    if (data.imageId && old.imageId) {
        deleteFile(old.imageId);
    }


    return await prisma.posts.update({
        where: { id },
        data: payload,
    });
};

export const deletePostSer = async (id) => {
    const post = await prisma.posts.findUnique({ where: { id } });
    if (!post) throw new Error("Post not found");

    // delete file from storage
    if (post.imageId) {
        deleteFile(post.imageId);
    }

    // delete from DB
    return await prisma.posts.delete({ where: { id } });
};
