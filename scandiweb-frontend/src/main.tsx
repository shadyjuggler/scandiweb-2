import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { AppDataProvider } from "./context/AppDataProvider.tsx";
import { BrowserRouter} from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>{/*<= Keep for debug */}
        <BrowserRouter> {/*<= React router */}
            <AppDataProvider> {/*<= Application Context */}
                <App /> {/*<= Application */}
            </AppDataProvider>
        </BrowserRouter>
    </StrictMode>
);
