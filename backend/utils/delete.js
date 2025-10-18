import fs from "fs";
import prisma from "../prisma/client.js"; // adjust path if needed

/**
 * Delete a file from both storage and database
 * @param {number} fileId - ID of the file in DB (File table)
 * @returns {Promise<boolean>} - true if deleted, false if not found
 */
export async function deleteFileById(req, res) {
    const fileId = Number(req.params.id);
    // 1. Find file in DB
    const file = await prisma.file.findUnique({
        where: { id: fileId },
    });

    if (!file) {
        console.log("File record not found in DB");
        return res.status(404).json({ error: "File not found" });
    }

    // 2. Delete file from storage
    try {
        fs.unlinkSync(file.path); // remove the file
    } catch (err) {
        console.warn("File not found in storage or already deleted:", file.path);
        return res.status(500).json({ error: "Failed to delete file from storage" });

    }

    // 3. Delete DB record
    await prisma.file.delete({
        where: { id: fileId },
    });

    return res.json({ ok: true });
}
