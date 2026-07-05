                    React Frontend
                           │
                           ▼
                    Express Backend
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      LangGraph        Memory Store      File Upload
          │                                 │
          ▼                                 ▼
     Multi Agents                    PDF/DOC/TXT
          │                                 │
          ├──────────────┐                  ▼
          ▼              ▼            Document Loader
     Search Agent   RAG Agent               │
          │              │                  ▼
          ▼              ▼          Text Splitter
     Tavily Tool   Vector Search            │
          │              │                  ▼
          └──────────────┼────────────► Embeddings
                         │                  │
                         ▼                  ▼
                    Final Response     Vector Database
# 🤖 Multi-Agent AI Assistant (ChatGPT Clone)

A production-ready **Multi-Agent AI Assistant** built using **React.js, Node.js, LangChain, LangGraph, Groq, HuggingFace Embeddings, and Tavily Search**.

The assistant supports **Retrieval-Augmented Generation (RAG)**, **multi-agent orchestration**, **PDF knowledge ingestion**, **web search**, **conversation memory**, and **tool calling**, providing an experience similar to modern AI assistants like ChatGPT, Claude, and Perplexity.

---

## 🚀 Live Demo

Frontend:
> https://your-frontend-url.vercel.app

Backend:
> https://your-backend-url.vercel.app

---

# ✨ Features

### 💬 ChatGPT-like Interface

- Clean and responsive UI
- Real-time chat
- Markdown support
- Loading states
- Auto scroll
- Chat history
- Session-based conversations

---

### 🧠 Multi-Agent Architecture

Implemented using **LangGraph**.

The system consists of multiple specialized AI agents:

- Supervisor Agent
- Memory Agent
- RAG Agent
- Web Search Agent
- Response Agent

The Supervisor dynamically decides which agents should execute based on the user's query.

---

### 📄 Retrieval Augmented Generation (RAG)

Supports uploading PDFs and querying them naturally.

Pipeline:

```
PDF Upload
      ↓
PDF Loader
      ↓
Chunking
      ↓
Embeddings
      ↓
Vector Store
      ↓
Retriever
      ↓
Groq LLM
```

---

### 🌐 Web Search

Integrated with **Tavily AI**.

Whenever the uploaded documents cannot answer the user's question, the assistant can automatically search the internet for relevant information.

---

### 🧠 Conversation Memory

Maintains conversation history per session.

Supports:

- Multi-turn conversations
- Context retention
- Session-based memory

---

### 🤖 Tool Calling

The assistant intelligently decides between:

- Internal knowledge
- Uploaded documents
- Web search

before generating a final response.


                  
