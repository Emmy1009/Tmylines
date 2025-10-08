// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from "./App.jsx"
// import "bootstrap/dist/css/bootstrap.min.css"

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {Toaster} from "react-hot-toast"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
      <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 4000, // default 4s
        style: {
          fontSize: "14px",
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
        },
      }}
    />
  </React.StrictMode>
);