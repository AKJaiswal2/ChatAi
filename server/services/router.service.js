import graph from "../graph/graph.js";

export const routeQuestion = async ({
    sessionId,
    question,
    history = [],
}) => {
    try {
        const result = await graph.invoke({
            sessionId,
            question,
            history,

            route: {
                memory: false,
                rag: false,
                search: false,
            },

            memory: "",
            ragContext: "",
            webContext: "",
            response: "",
        });

        return result;
    } catch (error) {
        console.error("Router Error:", error);
        throw error;
    }
};