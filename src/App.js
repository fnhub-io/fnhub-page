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
    event.stopPropagation();
    dropZoneRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".wasm")) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setOutput("");
      setIsError(false);
    }
  };

  // Update the executeWasm function in App.js
  // Alternative if you need to send file content
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
      // Send just the filename as a string, not the file content
      const response = await fetch("http://localhost:8080/execute", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: fileName, // Just the filename, not the file object
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

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon">
            <span className="code-bracket">{"{"}</span>
            <span className="code-bracket">{"}"}</span>
          </div>
          <h1>FnHub</h1>
        </div>
        <p className="subtitle">Upload and Execute WebAssembly Modules</p>
      </header>

      <main className="app-main">
        <div
          className="upload-container"
          ref={dropZoneRef}
          onClick={handleContainerClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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

        <button
          className="execute-button"
          onClick={executeWasm}
          disabled={isExecuting}
        >
          <FiPlay size={20} />
          Execute Function
        </button>

        <div className="output-container">
          <h2>Output</h2>
          <div className={`output-content ${isError ? "error" : ""}`}>
            {output}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
