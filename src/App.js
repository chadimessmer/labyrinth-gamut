import "./styles/app.scss";
import React from "react";
import Home from "./pages/Home";
import Lounge from "./pages/Lounge";
import Vision from "./pages/Vision";
import Visionary from "./pages/Visionary";
import Chatroom from "./pages/Chatrooms";
import Support from "./pages/Support";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/visionary" element={<Visionary />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
