import { v4 as uuid } from "uuid";

import { loadPDF } from "../loaders/pdf.loader.js";
import { splitDocuments } from "../rag/chunker.js";
import vectorStore from "../rag/vectorStore.js";

export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Generate a unique document ID
        const documentId = uuid();

        // Load the PDF
        const docs = await loadPDF(req.file.path);

        // Split the document into chunks
        const chunks = await splitDocuments(docs);

        // Enrich each chunk with metadata
        const enrichedChunks = chunks.map((chunk) => ({
            ...chunk,
            metadata: {
                ...chunk.metadata,
                documentId,
                originalName: req.file.originalname,
                filename: req.file.filename,
                uploadedAt: new Date().toISOString(),
            },
        }));

        // Store enriched chunks in the vector store
        await vectorStore.addDocuments(enrichedChunks);

        return res.status(201).json({
            success: true,
            documentId,
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            pages: docs.length,
            chunks: enrichedChunks.length,
            message: "Document uploaded and indexed successfully.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};