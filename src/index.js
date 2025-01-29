import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18+
import "./index.css"; // Ensure the file exists
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
