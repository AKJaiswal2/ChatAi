import { generateResponse } from "../services/groq.service.js";

// ── LangGraph node ───────────────────────────────────────────────────────────

export default async function responderAgent(state) {
    try {
        const { question, history = [], memoryContext, ragContext, webContext } = state;

        // Build combined context from all agents
        const contextParts = [];

        if (memoryContext) {
            contextParts.push(`--- Relevant Conversation Memory ---\n${memoryContext}`);
        }

        if (ragContext) {
            contextParts.push(`--- Document Context ---\n${ragContext}`);
        }

        if (webContext) {
            contextParts.push(`--- Web Search Results ---\n${webContext}`);
        }

        const combinedContext = contextParts.join("\n\n") || "No external context available.";

        // Format history
        const historyText = history.length
            ? history.map((m) => `${m.role}: ${m.content}`).join("\n")
            : "No prior conversation.";

        const messages = [
            {
                role: "system",
                content: `You are a helpful AI assistant.

Conversation History:
${historyText}

---

Retrieved Context:
${combinedContext}

---

Instructions:
1. Use retrieved context whenever it is relevant.
2. If no context exists, answer normally from your own knowledge.
3. Maintain conversational continuity using history when relevant.
4. Never mention whether information came from documents, memory, or web search.
5. If you don't know the answer, say so honestly.
6. Be concise and clear.`,
            },
            {
                role: "user",
                content: question,
            },
        ];

        const response = await generateResponse(messages);

        console.log("[Responder Agent] generated response");

        return { response };
    } catch (error) {
        console.error("[Responder Agent] Error:", error);
        return { response: "I encountered an error while generating a response. Please try again." };
    }
}
