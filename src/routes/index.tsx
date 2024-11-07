import { createHashRouter } from "react-router-dom";
import Home from "./../pages/Home";
import Mobx from "./../pages/Mobx";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/mobx",
        element: <Mobx />
    }
]);

export default router;
