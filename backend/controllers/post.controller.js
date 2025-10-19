// controllers/postController.js

import { createPostSer, deletePostSer, getAllPost, getOnePost, updatePostSer } from "../services/posts.service";


export async function createPost(req, res) {
    try {
        const { title, content, imageId, gradeId } = req.body;

        const post = await createPostSer({ title, content, gradeId, imageId });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getPosts(req, res) {
    const posts = await getAllPost();
    res.json(posts);
}

export async function getPost(req, res) {
    const post = await getOnePost(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
}

export async function updatePost(req, res) {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.path : undefined;

        const post = await updatePostSer(Number(req.params.id), {
            title,
            content,
            imagePath,
        });

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
