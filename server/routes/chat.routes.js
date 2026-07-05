import express from "express";

const router = express.Router();

import { chatController } from "../controllers/chat.controller.js";

router.post("/", chatController);

export default router;