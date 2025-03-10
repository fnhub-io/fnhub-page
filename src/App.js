import React, { useState, useRef } from "react";
import "./App.css";
import { FiUpload, FiPlay } from "react-icons/fi";

function App() {
  const [fileName, setFileName] = useState("temp.wasm");
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [params, setParams] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".wasm")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setOutput("");
      setIsError(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropZoneRef.current.classList.remove("drag-over");
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".wasm")) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setOutput("");
      setIsError(false);
    }
  };

  const handleParamsChange = (event) => {
    setParams(event.target.value);
  };

  const uploadWasm = async () => {
    if (!file) {
      setOutput("Please upload a .wasm file first");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("fn_name", file.name);
    formData.append("wasm_file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.text();
      setOutput(result);
    } catch (error) {
      setOutput(`Upload failed: ${error.message}`);
      setIsError(true);
    }
  };

  const executeWasm = async () => {
    if (!file) {
      setOutput("Please upload a .wasm file first");
      setIsError(true);
      return;
    }

    setIsExecuting(true);
    setOutput("Executing...");
    setIsError(false);

    try {
      const response = await fetch("http://localhost:8080/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fn_name: fileName,
          params: params.split(",").map((p) => p.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.text();
      setOutput(data);
    } catch (error) {
      setOutput(`Error executing WASM module: ${error.message}`);
      setIsError(true);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FnHub</h1>
        <p>Upload and Execute WebAssembly Modules</p>
      </header>

      <main className="app-main">
        <div
          className="upload-container"
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <div className="upload-icon">
            <FiUpload size={48} color="#5b9dff" />
          </div>
          <p className="file-name">{fileName}</p>
          <p className="upload-text">or drag and drop here</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".wasm"
            className="file-input"
          />
        </div>
        <button className="upload-button" onClick={uploadWasm}>
          Upload WASM
        </button>
        <input
          type="text"
          placeholder="Enter parameters (comma-separated)"
          value={params}
          onChange={handleParamsChange}
        />
        <button
          className="execute-button"
          onClick={executeWasm}
          disabled={isExecuting}
        >
          <FiPlay size={20} /> Execute Function
        </button>
        <div className={`output-container ${isError ? "error" : ""}`}>
          {output}
        </div>
      </main>
    </div>
  );
}

export default App;
