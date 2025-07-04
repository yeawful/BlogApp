import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import { store } from "./store/store";
import "./styles/index.scss";
import "normalize.css";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
