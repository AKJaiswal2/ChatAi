import { tavily } from "@tavily/core";

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async (query) => {
    try {
        const response = await tvly.search(query, {
            searchDepth: "advanced",
            maxResults: 5,
        });

        return response.results;
    } catch (error) {
        console.error("Tavily Error:", error);
        return [];
    }
};