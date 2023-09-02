import "./styles/index.css";
import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext.tsx";
import { ViewProvider } from "./context/ViewContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteProvider>
        <ViewProvider>
          <App />
        </ViewProvider>
      </NoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
