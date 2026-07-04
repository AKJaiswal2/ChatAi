import { FaRobot } from "react-icons/fa";
import PromptCard from "./PromptCard";

const prompts = [
    {
        title: "Explain React",
        subtitle: "in simple terms",
    },
    {
        title: "Write Express Middleware",
        subtitle: "for authentication",
    },
    {
        title: "Explain JWT",
        subtitle: "with examples",
    },
    {
        title: "Optimize SQL Query",
        subtitle: "for millions of rows",
    },
];

const Welcome = () => {
    return (
        <div className="flex flex-col items-center">

            <FaRobot
                size={55}
                className="mb-6 text-gray-200"
            />

            <h1 className="text-5xl font-semibold mb-10">
                How can I help today?
            </h1>

            <div className="grid grid-cols-2 gap-5">
                {prompts.map((prompt, index) => (
                    <PromptCard
                        key={index}
                        title={prompt.title}
                        subtitle={prompt.subtitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Welcome;