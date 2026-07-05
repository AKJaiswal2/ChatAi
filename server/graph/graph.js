import { StateGraph, START, END, Annotation } from "@langchain/langgraph";

import supervisorAgent from "../agents/supervisor.agent.js";
import memoryAgent from "../agents/memory.agent.js";
import ragAgent from "../agents/rag.agent.js";
import searchAgent from "../agents/search.agent.js";
import responderAgent from "../agents/responder.agent.js";

// ── State shape ───────────────────────────────────────────────────────────────
// NOTE: Node names and state keys must NOT clash in LangGraph.
// Nodes: supervisor, memory, rag, search, responder
// Keys : sessionId, question, history, route, memoryContext, ragContext, webContext, response

const GraphState = Annotation.Root({

    sessionId: Annotation({
        default: () => "default-session",
    }),

    question: Annotation({
        default: () => "",
    }),

    history: Annotation({
        default: () => [],
    }),

    route: Annotation({
        default: () => ({
            memory: false,
            rag: false,
            search: false,
        }),
    }),

    // Renamed from "memory" to avoid clash with the "memory" node name
    memoryContext: Annotation({
        default: () => "",
    }),

    ragContext: Annotation({
        default: () => "",
    }),

    webContext: Annotation({
        default: () => "",
    }),

    response: Annotation({
        default: () => "",
    }),
});

// ── Build graph ───────────────────────────────────────────────────────────────

const workflow = new StateGraph(GraphState);

// Register nodes
workflow.addNode("supervisor", supervisorAgent);
workflow.addNode("memory",     memoryAgent);
workflow.addNode("rag",        ragAgent);
workflow.addNode("search",     searchAgent);
workflow.addNode("responder",  responderAgent);

// Entry point
workflow.addEdge(START, "supervisor");

// Supervisor decides which tool nodes to invoke (or skips straight to responder)
workflow.addConditionalEdges(
    "supervisor",
    (state) => {
        const next = [];

        if (state.route.memory) next.push("memory");
        if (state.route.rag)    next.push("rag");
        if (state.route.search) next.push("search");

        // If no tool needed, go straight to the responder
        if (next.length === 0) return ["responder"];

        return next;
    },
    {
        memory:    "memory",
        rag:       "rag",
        search:    "search",
        responder: "responder",
    }
);

// All tool nodes converge at the responder
workflow.addEdge("memory", "responder");
workflow.addEdge("rag",    "responder");
workflow.addEdge("search", "responder");

// Responder is the final node
workflow.addEdge("responder", END);

// ── Compile ───────────────────────────────────────────────────────────────────

const graph = workflow.compile();

export default graph;