const tavily = require("../config/tavily");

const searchWeb = async (query) => {
    try {
        const { data } = await tavily.post("/search", {
            api_key: process.env.TAVILY_API_KEY,

            query,

            search_depth: "advanced",

            include_answer: true,

            include_images: false,

            max_results: 5,
        });

        return data;
    } catch (err) {
        console.error(err);

        throw new Error("Tavily search failed");
    }
};

module.exports = {
    searchWeb,
};