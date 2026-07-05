import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import embeddings from "./embeddings.js";

const vectorStore = new MemoryVectorStore(embeddings);

export default vectorStore;