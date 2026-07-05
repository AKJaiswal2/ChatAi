import { searchInternet } from "../services/tavily.service.js";

// ── LangGraph node ───────────────────────────────────────────────────────────

export default async function searchAgent(state) {
    try {
        const results = await searchInternet(state.question);

        const webContext = results
            .map(
                (item, index) =>
                    `Result ${index + 1}\n\nTitle: ${item.title}\n\nContent:\n${item.content}`
            )
            .join("\n\n----------------------\n\n");

        console.log("[Search Agent] retrieved", results.length, "web results");

        return { webContext };
    } catch (error) {
        console.error("[Search Agent] Error:", error);
        return { webContext: "" };
    }
}