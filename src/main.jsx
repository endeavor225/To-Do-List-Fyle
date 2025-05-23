import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider locale="fr-FR">
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
