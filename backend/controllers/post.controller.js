// controllers/postController.js
import { postService } from '../services/postService.js';

export async function createPost(req, res) {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const post = await postService.create({ title, content, imagePath });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getPosts(req, res) {
    const posts = await postService.getAll();
    res.json(posts);
}

export async function getPost(req, res) {
    const post = await postService.getOne(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
}

export async function updatePost(req, res) {
    try {
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.path : undefined;

        const post = await postService.update(Number(req.params.id), {
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
        await postService.delete(Number(req.params.id));
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
