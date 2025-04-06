import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { AppDataProvider } from "./context/AppDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>   {/*<= Keep for debug */}
         <AppDataProvider>   {/*<= Application Context */}
            <App />   {/*<= Application */}
        </AppDataProvider>
    </StrictMode>
);
