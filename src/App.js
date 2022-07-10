import React from "react";
import { BrowserRouter } from "react-router-dom";
import Calculator from "./components/Calculator";

function App() {
  return (
    <BrowserRouter>
      <Calculator />
    </BrowserRouter>
  );
}

export default App;
