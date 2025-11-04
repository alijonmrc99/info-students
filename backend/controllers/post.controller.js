// controllers/postController.js

import { countPosts, createPostSer, deletePostSer, getAllPost, getOnePost, updatePostSer } from "../services/posts.service.js";


export async function createPost(req, res) {
    try {
        const { title, content, imageId, gradeId } = req.body;

        const post = await createPostSer({ title, content, gradeId, imageId });
        if (post)
            res.status(201).json({
                message: "Ok",
                success: true,
            });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getPosts(req, res) {
    let { page, perPage } = req.query;

    if (Number(page) == 0) {
        page = 1
    }
    console.log(Number(page) == 0);


    const posts = await getAllPost({ skip: Number(perPage * (page - 1)) || 0, take: Number(perPage) || 50, });
    const total = await countPosts();

    const response = {
        data: posts,
        meta: {
            total,
            currentPage: Math.floor((Number(perPage * (page)) || 0) / (Number(perPage) || 50)) + 1,
            perPage: Number(perPage) || 50,
            totalPages: Math.ceil(total / (Number(perPage) || 50))
        }
    }
    res.json(response);
}

export async function getPost(req, res) {
    const post = await getOnePost(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
}

export async function updatePost(req, res) {
    try {
        const post = await updatePostSer(Number(req.params.id), req.body);
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deletePost(req, res) {
    try {
        await deletePostSer(Number(req.params.id));
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
