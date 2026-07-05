import { generateResponse } from "../services/groq.service.js";

export default async function supervisorAgent(state) {

    const prompt = `
You are an intelligent routing agent.

Your job is ONLY to decide which tools are required.

Available tools:

1. memory
Use when the question depends on previous conversation.

Examples:
- what was my name?
- what did i ask earlier?
- summarize our chat

2. rag
Use when the question is about uploaded documents.

Examples:
- summarize my resume
- what are my skills
- explain chapter 3
- what does the pdf say

3. search
Use when the question requires latest information.

Examples:
- today's news
- weather
- IPL score
- latest AI models
- who won yesterday

Return ONLY valid JSON.

Example:

{
    "memory": true,
    "rag": false,
    "search": true
}

No markdown.
No explanation.
`;

    const messages = [
        {
            role: "system",
            content: prompt,
        },
        {
            role: "user",
            content: state.question,
        },
    ];

    const response = await generateResponse(messages);

    let route = {
        memory: false,
        rag: false,
        search: false,
    };

    try {
        route = JSON.parse(response);
    } catch (e) {
        console.log("Supervisor parsing failed.");
    }

    console.log("Route:", route);

    return {
        ...state,
        route,
    };
}