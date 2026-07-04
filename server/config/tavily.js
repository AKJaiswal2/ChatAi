const axios = require("axios");

const tavily = axios.create({
    baseURL: "https://api.tavily.com",
    headers: {
        "Content-Type": "application/json",
    },
});

module.exports = tavily;