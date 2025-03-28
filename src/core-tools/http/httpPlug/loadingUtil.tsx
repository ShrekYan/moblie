import { createRoot } from "react-dom/client";
import { Loading } from "react-awesome-all-component";

const loadingUtil = {
    showLoading() {
        const newRootElement = document.createElement("div");
        newRootElement.id = "loading-wrapper";
        document.body.appendChild(newRootElement);
        createRoot(newRootElement).render(<Loading showLoading={true} />);
    },
    removeLoading() {
        const loadingElement = document.getElementById("loading-wrapper");
        if (loadingElement) {
            document.body.removeChild(loadingElement);
        }
    }
};

export default loadingUtil;
