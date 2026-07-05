import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import embeddings from "../rag/embeddings.js";

const memoryStore = new MemoryVectorStore(embeddings);

// ── Utilities (used externally by chat.service.js) ───────────────────────────

export async function saveMemory(question, answer) {
    await memoryStore.addDocuments([
        {
            pageContent: `User: ${question}\n\nAssistant: ${answer}`,
            metadata: {
                type: "memory",
                timestamp: Date.now(),
            },
        },
    ]);
}

export async function searchMemory(query) {
    const docs = await memoryStore.similaritySearch(query, 4);
    return docs;
}

// ── LangGraph node ───────────────────────────────────────────────────────────

export default async function memoryAgent(state) {
    try {
        const docs = await searchMemory(state.question);

        const memory = docs
            .map((doc, i) => `Memory ${i + 1}:\n${doc.pageContent}`)
            .join("\n\n");

        console.log("[Memory Agent] retrieved", docs.length, "memories");

        return { memoryContext: memory };
    } catch (error) {
        console.error("[Memory Agent] Error:", error);
        return { memoryContext: "" };
    }
}