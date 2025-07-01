import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}
