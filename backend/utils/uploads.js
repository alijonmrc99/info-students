import multer from "multer";
import path from "path";
import fs from "fs";

export function createUploader(folderName, maxCount = 15) {
    const uploadPath = path.join("uploads", folderName);

    // ✅ Ensure folder exists
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, uniqueSuffix + ext);
        },
    });

    const upload = multer({ storage });

    return {
        single: (fieldName) => upload.single(fieldName),
        multiple: (fieldName) => upload.array(fieldName, maxCount),
    };
}
