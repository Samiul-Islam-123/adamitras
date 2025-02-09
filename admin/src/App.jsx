import { useState } from "react";

function App() {
  const [tab, setTab] = useState("blog");
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setTab("blog")}
          style={{
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            background: tab === "blog" ? "#007bff" : "#ddd",
            color: tab === "blog" ? "white" : "black",
          }}
        >
          Blog
        </button>
        <button
          onClick={() => setTab("pyq")}
          style={{
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            background: tab === "pyq" ? "#007bff" : "#ddd",
            color: tab === "pyq" ? "white" : "black",
          }}
        >
          PYQ
        </button>
      </div>

      {/* Content */}
      {tab === "blog" && <div><h2>Blog Section</h2><p>Write your blog here...</p></div>}

      {tab === "pyq" && (
        <div>
          <h2>Upload PYQs</h2>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ marginBottom: "10px" }}
          />
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
