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