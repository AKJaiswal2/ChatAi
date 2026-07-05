import { retrieveDocuments, buildContext } from "../rag/rag.service.js";

// ── LangGraph node ───────────────────────────────────────────────────────────

export default async function ragAgent(state) {
    try {
        const docs = await retrieveDocuments(state.question);
        const ragContext = buildContext(docs);

        console.log("[RAG Agent] retrieved", docs.length, "documents");

        return { ragContext };
    } catch (error) {
        console.error("[RAG Agent] Error:", error);
        return { ragContext: "" };
    }
}