import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Compiler from "./Compiler";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compiler" element={<Compiler />} />
    </Routes>
  );
}

export default App;
