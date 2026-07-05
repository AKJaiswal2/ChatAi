import vectorStore from "./vectorStore.js";

const retriever = vectorStore.asRetriever({
    k: 4, // Retrieve the top 4 most relevant chunks
});

export default retriever;