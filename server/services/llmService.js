const groq = require("../config/groq");

const tools = [
    {
        type: "function",

        function: {
            name: "web_search",

            description:
                "Search the web whenever you need recent, factual or live information.",

            parameters: {
                type: "object",

                properties: {
                    query: {
                        type: "string",

                        description: "Search query",
                    },
                },

                required: ["query"],
            },
        },
    },
];

const systemPrompt = `
You are a helpful AI assistant.

When you need recent information, news, current events, live data, or facts beyond your knowledge cutoff, you must use the web_search tool provided to you.
Do not attempt to write out the function call as text; use the native tool calling capability.
Otherwise, answer directly.
`;

const askLLM = async (messages) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        messages: [
            {
                role: "system",
                content: systemPrompt,
            },

            ...messages,
        ],

        tools,

        tool_choice: "auto",

        temperature: 0.7,
    });

    return completion.choices[0].message;
};

module.exports = {
    askLLM,
};