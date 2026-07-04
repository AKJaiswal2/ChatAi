const { chat } = require("../services/agentService");

const chatController = async (req, res) => {
    try {
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({
                success: false,
                message: "Messages are required",
            });
        }

        const reply = await chat(messages);

        res.json({
            success: true,
            reply,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    chat: chatController,
};