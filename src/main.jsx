import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import NoteProvider from "./context/NoteProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
    }}
  >
    <AuthProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </AuthProvider>
  </BrowserRouter>
  // <StrictMode>
  //  </StrictMode>
);
