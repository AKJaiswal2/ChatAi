import { chat } from "../services/chat.service.js";

export const chatController = async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const response = await chat(
            sessionId || "default-session",
            message
        );

        return res.status(200).json({
            success: true,
            sessionId: sessionId || "default-session",
            ...response,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};