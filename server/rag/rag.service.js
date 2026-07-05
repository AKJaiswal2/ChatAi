import retriever from "./retriever.js";

export const retrieveDocuments = async (query) => {
    try {
        const documents = await retriever.invoke(query);

        return documents;
    } catch (error) {
        console.error("Retriever Error:", error);
        return [];
    }
};

export const buildContext = (documents = []) => {
    if (!documents.length) return "";

    return documents
        .map((doc, index) => {
            return `
Document ${index + 1}

${doc.pageContent}
`;
        })
        .join("\n------------------------\n");
};