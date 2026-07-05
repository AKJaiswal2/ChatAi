import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadDocument } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadDocument);

export default router;