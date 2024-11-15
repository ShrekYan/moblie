// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AliveScope } from "react-activation";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    //兼容react-activation库，需要关闭StrictMode
    <>
        <AliveScope>
            {/*<StrictMode>*/}
            <App />
            {/* </StrictMode>*/}
        </AliveScope>
    </>
);
