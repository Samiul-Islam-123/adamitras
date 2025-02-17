import React from 'react'
import { useState } from 'react';

export const PYQ = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files).filter(file => file.type === "application/pdf");
      if (selectedFiles.length === 0) {
        setError("Only PDF files are allowed.");
        return;
      }
      setFiles([...files, ...selectedFiles]);
      setError(null);
    };
  
    const uploadFiles = async () => {
      if (files.length === 0) {
        setError("Please select at least one PDF file.");
        return;
      }
      setUploading(true);
      setError(null);
  
      const formData = new FormData();
      files.forEach(file => formData.append("files", file));
      formData.append('role', 'admin');
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data);
        if(Array.isArray(response.data.urls)){
          const urls = response.data.urls;
          urls.map(async item => {
            const URLResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-url`,{ url:item })
            if(URLResponse.data.success === false){
              alert(URLResponse.data.message);
              return;
            }
          });
        }
        alert("Files uploaded successfully!");
        setFiles([]);
      } catch (err) {
        setError("File upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div>
        <h2>Upload PYQs (PDF Only)</h2>
        <input type="file" multiple accept="application/pdf" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
          ))}
        </ul>
        <button
          onClick={uploadFiles}
          disabled={uploading || files.length === 0}
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    );
}
