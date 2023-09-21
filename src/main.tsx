import "./assets/styles/index.css";
import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NoteContextProvider } from "./context/NoteContext/NoteContext.tsx";
import { ViewContextProvider } from "./context/ViewContext/ViewContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteContextProvider>
        <ViewContextProvider>
          <App />
        </ViewContextProvider>
      </NoteContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
