import prisma from "../prisma/client.js";

export async function postImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const image = await prisma.postImages.create({
            data: {
                path: req.file.path,   // e.g. "uploads/123456.jpg"
            },
        });

        return res.status(201).json({
            success: true,
            data: image
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload image" });
    }
}
