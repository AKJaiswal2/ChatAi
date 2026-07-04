import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoArrowUp } from "react-icons/io5";

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        onSend(input);

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            handleSend();
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto bg-[#2F2F2F] rounded-full flex items-center px-4 py-3 border border-[#444]">

                <button className="w-10 h-10 rounded-full hover:bg-[#404040] flex items-center justify-center">
                    <FiPlus size={20} />
                </button>

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className="flex-1 bg-transparent outline-none px-4"
                    placeholder="Ask anything..."
                />

                <button
                    onClick={handleSend}
                    disabled={disabled}
                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"
                >
                    <IoArrowUp />
                </button>

            </div>
        </div>
    );
};

export default ChatInput;