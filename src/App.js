import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from "./Components/Update";
import Layout from "./Components/Layout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Create />} />
            <Route path="create" element={<Create />} />
            <Route path="read" element={<Read />} />
            <Route path="update" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
