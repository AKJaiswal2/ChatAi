import Message from "./Message";

const ChatMessages = ({ messages, loading }) => {
    return (
        <div className="max-w-4xl mx-auto py-8">

            {messages.map((message, index) => (
                <Message
                    key={index}
                    role={message.role}
                    content={message.content}
                />
            ))}

            {loading && (
                <Message
                    role="assistant"
                    content="Thinking..."
                />
            )}

        </div>
    );
};

export default ChatMessages;