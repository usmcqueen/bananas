import React from "react";
import App from "./App";

import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "./context/authContext";
import { createRoot } from 'react-dom/client';


const root =createRoot(document.getElementById("root"));

//  root.render(<App />);
// console.log("Rendering app...");
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
