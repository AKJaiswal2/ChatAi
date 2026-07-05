import { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import api from "../services/api";

const UploadButton = () => {
    const inputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            await api.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Document indexed successfully!");
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }

        setUploading(false);
    };

    return (
        <>
            <button
                onClick={() => inputRef.current.click()}
                disabled={uploading}
                className="w-10 h-10 flex-shrink-0 rounded-full hover:bg-[#404040] flex items-center justify-center text-white"
            >
                {uploading ? "..." : <FiPlus size={20} />}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={handleUpload}
            />
        </>
    );
};

export default UploadButton;