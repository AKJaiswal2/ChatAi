import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

const splitDocuments = async (documents) => {
    try {
        const chunks = await splitter.splitDocuments(documents);

        return chunks;
    } catch (error) {
        throw error;
    }
};

export {
    splitDocuments,
};