import { routeQuestion } from "./router.service.js";
import { getLastMessages, saveMessage } from "./memory.service.js";
import { saveMemory } from "../agents/memory.agent.js";

export const chat = async (sessionId, message) => {
    try {
        // Retrieve the last 10 messages for history context
        const history = getLastMessages(sessionId, 10);

        // Run the full multi-agent LangGraph pipeline
        const result = await routeQuestion({
            sessionId,
            question: message,
            history,
        });

        const answer = result.response;

        // Persist conversation in session store
        saveMessage(sessionId, "user",      message);
        saveMessage(sessionId, "assistant", answer);

        // Also save to semantic memory store for future memory lookups
        await saveMemory(message, answer);

        return {
            answer,
            route: result.route,
        };

    } catch (error) {
        console.error("[Chat Service] Error:", error);
        throw error;
    }
};