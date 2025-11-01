import { Router } from "express";
import { createUploader } from "../utils/uploads.js";
import { postImage } from "../controllers/posts.controller.js";
import { studentsFiles } from "../services/students.service.js";
import { deleteFileById } from "../utils/delete.js";
import authMiddleware from "../middleware/auth.middleware.js";

const uploadStudentImage = createUploader("studentImages");
const uploadPostFile = createUploader("postFiles");
const uploadStudentFile = createUploader("studentFiles");

const router = Router();
// upload single file, field name = "image"
router.post("/image", authMiddleware, uploadStudentImage.single("imagePath"), (req, res) => {
    res.json({
        success: true,
        data: {
            imagePath: req.file.path,
        }
    });
});

// upload single file, field name = "image"
router.post("/post", authMiddleware, uploadPostFile.single("imageId"), postImage);
``
// upload multi file, field name = "files"
router.post("/files", uploadStudentFile.multiple("files", 15), studentsFiles);

router.delete("/files/:id", authMiddleware, deleteFileById);

export default router;
