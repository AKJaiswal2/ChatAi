const conversations = new Map();

export const saveMessage = (sessionId, role, content) => {
    if (!conversations.has(sessionId)) {
        conversations.set(sessionId, []);
    }

    conversations.get(sessionId).push({
        role,
        content,
        timestamp: Date.now(),
    });
};

export const getConversation = (sessionId) => {
    return conversations.get(sessionId) || [];
};

export const clearConversation = (sessionId) => {
    conversations.delete(sessionId);
};

export const getFormattedConversation = (sessionId) => {
    const history = getConversation(sessionId);

    return history
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
};

export const getLastMessages = (sessionId, limit = 10) => {
    const history = getConversation(sessionId);

    return history.slice(-limit);
};

export const conversationExists = (sessionId) => {
    return conversations.has(sessionId);
};