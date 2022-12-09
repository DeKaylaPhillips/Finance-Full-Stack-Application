import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/AuthenticationPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<Authentication />} />
          <Route path="/home" element={<HomePage />}/> {/* Might need to add API in front of this. */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
