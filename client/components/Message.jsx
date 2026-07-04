const Message = ({ role, content }) => {
    return (
        <div
            className={`flex mb-8 ${role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
        >
            <div
                className={`max-w-3xl rounded-3xl px-6 py-4 whitespace-pre-wrap ${role === "user"
                        ? "bg-[#303030]"
                        : "bg-transparent"
                    }`}
            >
                {content}
            </div>
        </div>
    );
};

export default Message;