import { useState } from "react";
import Navbar from "./Navbar";

import Welcome from "./Welcome";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { sendMessage as sendMessageAPI } from "../services/api";

const ChatLayout = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (message) => {
        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            content: message,
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const data = await sendMessageAPI(message);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        }

        setLoading(false);
    };

    return (

        <div className="h-screen bg-[#212121] text-white flex flex-col">
            <Navbar />

            <main className="flex-1 overflow-y-auto px-6">
                {messages.length === 0 ? (
                    <Welcome />
                ) : (
                    <ChatMessages
                        messages={messages}
                        loading={loading}
                    />
                )}
            </main>

            <div className="flex justify-center pb-8">
                <div className="w-full max-w-4xl flex items-end gap-3">
                    <div className="flex-1">
                        <ChatInput
                            onSend={sendMessage}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChatLayout;