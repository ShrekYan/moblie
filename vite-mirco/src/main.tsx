// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    //兼容react-activation库，需要关闭StrictMode
    <>
        {/*<StrictMode>*/}
        <App />
        {/* </StrictMode>*/}
    </>
);
