import Groq from "groq-sdk";


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateResponse = async (messages) => {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            messages,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);
        throw error;
    }
};