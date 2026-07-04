import { useState } from "react";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import api from "../services/api";

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
            const updatedMessages = [
                ...messages,
                {
                    role: "user",
                    content: message,
                },
            ];

            const { data } = await api.post("/chat", {
                messages: updatedMessages,
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply,
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

            <ChatInput
                onSend={sendMessage}
                disabled={loading}
            />
        </div>
    );
};

export default ChatLayout;