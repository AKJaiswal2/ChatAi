import "dotenv/config";
import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/chat", chatRoutes);

app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});