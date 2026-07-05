import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api",
});

const SESSION_KEY = "chat-session-id";

const getSessionId = () => {
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
};

export const sendMessage = async (message) => {
    const response = await API.post("/chat", {
        sessionId: getSessionId(),
        message,
    });

    return response.data;
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await API.post("/upload", formData);

    return response.data;
};

export default API;