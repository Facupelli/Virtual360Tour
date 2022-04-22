import React, { useState } from "react";
import { CreateTour } from "./components/CreateTour/CreateTour";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";

function App() {
  const [files, setFiles] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home files={files} setFiles={setFiles}/>} />
      {/* <h1>REACT PANELLUM</h1>
      <ReactPanellum /> */}
    </Routes>
  );
}

export default App;
