const { askLLM } = require("./llmService");
const { searchWeb } = require("./tavilyService");

const chat = async (messages) => {
    // First LLM call
    const response = await askLLM(messages);

    // No tool needed
    if (!response.tool_calls) {
        return response.content;
    }

    // Handle tool calls
    for (const toolCall of response.tool_calls) {
        const toolName = toolCall.function.name;

        if (toolName === "web_search") {
            const args = JSON.parse(toolCall.function.arguments);

            const result = await searchWeb(args.query);

            messages.push(response);

            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                name: toolName,
                content: JSON.stringify(result),
            });
        }
    }

    // Second LLM call with tool output
    const finalResponse = await askLLM(messages);

    return finalResponse.content;
};

module.exports = {
    chat,
};