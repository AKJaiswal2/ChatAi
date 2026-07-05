import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

const uploadDir = path.join(process.cwd(), "./uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },

    filename(req, file, cb) {
        const extension = path.extname(file.originalname);

        cb(null, `${uuid()}${extension}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed"), false);
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, //20MB
    },
});