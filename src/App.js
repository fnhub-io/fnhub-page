import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import "./App.css";  


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
