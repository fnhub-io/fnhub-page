import React, { useState, useRef, useEffect } from "react";
import { FiUpload, FiPlay, FiCheckCircle, FiAlertTriangle, FiClock } from "react-icons/fi";

function App() {
  const [fileName, setFileName] = useState("temp.wasm");
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [theme, setTheme] = useState("dark");
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [params, setParams] = useState("");

  // Theme toggler
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Apply theme to body
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#ffffff" : "#0f172a";
    document.body.style.color = theme === "light" ? "#333333" : "#f0f0f0";
    document.body.style.transition = "all 0.3s ease";
  }, [theme]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".wasm")) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setOutput("");
      setIsError(false);
      setUploadSuccess(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.borderColor = "#f97316";
      dropZoneRef.current.style.backgroundColor = theme === "light" 
        ? "rgba(249, 115, 22, 0.05)" 
        : "rgba(249, 115, 22, 0.1)";
      dropZoneRef.current.style.transform = "translateY(-2px)";
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.borderColor = theme === "light" ? "#e0e0e0" : "#334155";
      dropZoneRef.current.style.backgroundColor = theme === "light" ? "#ffffff" : "#1e293b";
      dropZoneRef.current.style.transform = "translateY(0)";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.borderColor = theme === "light" ? "#e0e0e0" : "#334155";
      dropZoneRef.current.style.backgroundColor = theme === "light" ? "#ffffff" : "#1e293b";
      dropZoneRef.current.style.transform = "translateY(0)";
    }
    
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".wasm")) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setOutput("");
      setIsError(false);
      setUploadSuccess(false);
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

    setIsUploading(true);
    setOutput("Uploading...");
    setIsError(false);
    setUploadSuccess(false);

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
      setUploadSuccess(true);
    } catch (error) {
      setOutput(`Upload failed: ${error.message}`);
      setIsError(true);
    } finally {
      setIsUploading(false);
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

  // Inline styles with color theme from first application
  const styles = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      background: theme === 'light' ? '#ffffff' : '#0f172a',
    },
    appHeader: {
      textAlign: 'center',
      padding: '30px 20px',
      borderRadius: '12px',
      marginBottom: '30px',
      background: 'linear-gradient(-45deg, #0f172a, #1e293b, #1a1c2c, #2d1b30)',
      backgroundSize: '400% 400%',
      color: 'white',
      boxShadow: theme === 'light'
        ? '0 4px 20px rgba(0, 0, 0, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      animation: 'gradientBG 15s ease infinite'
    },
    logoContainer: {
      marginBottom: '15px'
    },
    logo: {
      fontSize: '36px',
      fontWeight: '700',
      letterSpacing: '1px',
      background: '#ffffff',
      color: '#f97316',
      padding: '8px 20px',
      borderRadius: '30px',
      display: 'inline-block',
      boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)'
    },
    logoSpan: {
      color: '#ea580c'
    },
    headerTitle: {
      fontSize: '2.5rem',
      marginBottom: '10px',
      fontWeight: '600'
    },
    headerSubtitle: {
      fontSize: '1.2rem',
      opacity: '0.9'
    },
    themeToggle: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      alignItems: 'center'
    },
    themeLabel: {
      marginLeft: '10px',
      fontSize: '14px'
    },
    switchContainer: {
      position: 'relative',
      display: 'inline-block',
      width: '60px',
      height: '30px'
    },
    switchInput: {
      opacity: '0',
      width: '0',
      height: '0'
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: theme === 'dark' ? '#f97316' : '#ccc',
      transition: '.4s',
      borderRadius: '34px'
    },
    switchSliderBefore: {
      position: 'absolute',
      content: '',
      height: '22px',
      width: '22px',
      left: theme === 'dark' ? '34px' : '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%'
    },
    appMain: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    },
    section: {
      backgroundColor: theme === 'light' ? '#f5f5f5' : 'rgba(30, 41, 59, 0.5)',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: theme === 'light' 
        ? '0 4px 15px rgba(0, 0, 0, 0.05)'
        : '0 4px 15px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      animation: 'fadeIn 0.5s ease-out',
      border: theme === 'light' 
        ? 'none' 
        : '1px solid rgba(249, 115, 22, 0.2)'
    },
    sectionTitle: {
      marginBottom: '20px',
      fontSize: '1.5rem',
      color: '#f97316',
      borderBottom: theme === 'light' 
        ? '2px solid #e0e0e0'
        : '2px solid #334155',
      paddingBottom: '10px',
      display: 'flex',
      alignItems: 'center'
    },
    uploadContainer: {
      border: file
        ? '2px solid #4CAF50'
        : theme === 'light'
          ? '2px dashed #e0e0e0'
          : '2px dashed #334155',
      borderRadius: '12px',
      padding: '40px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '20px',
      backgroundColor: file
        ? theme === 'light'
          ? 'rgba(76, 175, 80, 0.05)'
          : 'rgba(76, 175, 80, 0.1)'
        : theme === 'light'
          ? '#ffffff'
          : 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)'
    },
    uploadIcon: {
      marginBottom: '15px',
      transition: 'transform 0.3s ease'
    },
    fileName: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: theme === 'light' ? '#f97316' : '#f97316',
      wordBreak: 'break-all'
    },
    uploadText: {
      color: theme === 'light' ? '#888' : '#9ca3af',
      fontSize: '0.9rem'
    },
    fileInput: {
      display: 'none'
    },
    actionButton: {
      padding: '14px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed'
    },
    buttonIcon: {
      transition: 'transform 0.3s ease'
    },
    uploadButton: {
      backgroundColor: uploadSuccess 
        ? '#4CAF50' 
        : '#f97316',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    executeButton: {
      backgroundColor: '#ea580c',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },
    paramsContainer: {
      marginBottom: '20px'
    },
    paramsLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500'
    },
    paramsInput: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: theme === 'light'
        ? '2px solid #e0e0e0'
        : '2px solid #334155',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30, 41, 59, 0.7)',
      color: theme === 'light' ? '#333333' : '#f0f0f0',
      backdropFilter: 'blur(10px)'
    },
    outputContainer: {
      backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(30, 41, 59, 0.5)',
      borderRadius: '8px',
      padding: '20px',
      minHeight: '200px',
      overflow: 'auto',
      border: isError
        ? '2px solid #f44336'
        : output
          ? '2px solid #f97316'
          : theme === 'light'
            ? '2px solid #e0e0e0'
            : '2px solid #334155',
      fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
      position: 'relative',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      color: isError ? '#f44336' : theme === 'light' ? '#333333' : '#f0f0f0'
    },
    outputText: {
      whiteSpace: 'pre-wrap',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    outputIcon: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '24px'
    },
    emptyOutput: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      color: theme === 'light' ? '#888' : '#9ca3af',
      fontStyle: 'italic'
    },
    appFooter: {
      marginTop: '40px',
      textAlign: 'center',
      padding: '20px',
      color: theme === 'light' ? '#888' : '#9ca3af',
      fontSize: '0.9rem',
      borderTop: theme === 'light'
        ? '1px solid #e0e0e0'
        : '1px solid #334155'
    },
    version: {
      marginTop: '5px',
      fontSize: '0.8rem'
    }
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.appHeader}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>O<span style={styles.logoSpan}>R</span>B<span style={styles.logoSpan}>I</span>T</div>
        </div>
        <h1 style={styles.headerTitle}>WebAssembly Function Hub</h1>
        <p style={styles.headerSubtitle}>Upload, manage, and execute WebAssembly modules with ease</p>
        <div style={styles.themeToggle}>
          <label style={styles.switchContainer}>
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              style={styles.switchInput}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
          </label>
          <span style={styles.themeLabel}>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </header>

      <main style={styles.appMain}>
        <section style={{...styles.section, animationDelay: '0s'}}>
          <h2 style={styles.sectionTitle}>1. Select your WASM file</h2>
          <div
            style={styles.uploadContainer}
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <div style={styles.uploadIcon}>
              {file ? 
                <FiCheckCircle size={48} color="#4CAF50" /> : 
                <FiUpload size={48} color={theme === "light" ? "#f97316" : "#f97316"} />
              }
            </div>
            <p style={styles.fileName}>{fileName}</p>
            <p style={styles.uploadText}>{file ? "File ready for upload" : "Click or drag and drop here"}</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".wasm"
              style={styles.fileInput}
            />
          </div>

          <button 
            style={{
              ...styles.actionButton, 
              ...styles.uploadButton,
              ...(isUploading && styles.buttonDisabled)
            }} 
            onClick={uploadWasm}
            disabled={isUploading}
          >
            {isUploading ? 
              <FiClock style={styles.buttonIcon} /> : 
              uploadSuccess ? 
                <FiCheckCircle style={styles.buttonIcon} /> : 
                <FiUpload style={styles.buttonIcon} />
            }
            {isUploading ? "Uploading..." : uploadSuccess ? "Upload Successful" : "Upload WASM"}
          </button>
        </section>

        <section style={{...styles.section, animationDelay: '0.1s'}}>
          <h2 style={styles.sectionTitle}>2. Configure and Run</h2>
          <div style={styles.paramsContainer}>
            <label htmlFor="params-input" style={styles.paramsLabel}>Function Parameters:</label>
            <input
              id="params-input"
              type="text"
              placeholder="Enter parameters (comma-separated)"
              value={params}
              onChange={handleParamsChange}
              style={styles.paramsInput}
            />
          </div>
          <button
            style={{
              ...styles.actionButton, 
              ...styles.executeButton,
              ...((isExecuting || !file) && styles.buttonDisabled)
            }}
            onClick={executeWasm}
            disabled={isExecuting || !file}
          >
            {isExecuting ? 
              <FiClock style={styles.buttonIcon} /> : 
              <FiPlay style={styles.buttonIcon} />
            }
            {isExecuting ? "Executing..." : "Execute Function"}
          </button>
        </section>

        <section style={{...styles.section, animationDelay: '0.2s'}}>
          <h2 style={styles.sectionTitle}>3. Results</h2>
          <div style={styles.outputContainer}>
            {isError && <FiAlertTriangle style={styles.outputIcon} color="#f44336" />}
            {output ? (
              <pre style={styles.outputText}>{output}</pre>
            ) : (
              <div style={styles.emptyOutput}>
                <p>Output will appear here after execution</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer style={styles.appFooter}>
        <p>Orbit - WebAssembly Function Management Tool</p>
        <p style={styles.version}>Version 1.0.0</p>
      </footer>

      {/* Add keyframe animations through a style tag */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes glow {
            from {
              box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
            }
            to {
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
            }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          /* Toggle Switch Animation */
          .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${theme === 'dark' ? '#f97316' : '#ccc'};
            transition: .4s;
            border-radius: 34px;
          }
          
          .toggle-slider:before {
            position: absolute;
            content: "";
            height: 22px;
            width: 22px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
            transform: ${theme === 'dark' ? 'translateX(30px)' : 'translateX(0)'};
          }
          
          .toggle-input:checked + .toggle-slider {
            background-color: #f97316;
          }
          
          .toggle-input:focus + .toggle-slider {
            box-shadow: 0 0 1px #f97316;
          }
        `}
      </style>
    </div>
  );
}

export default App;