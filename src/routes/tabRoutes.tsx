import TabWrapper from "@/pages/Tabs/index.tsx";
import Home from "@/pages/Tabs/Home/index.tsx";
import Choose from "@/pages/Tabs/Choose/index.tsx";
import Fof from "@/pages/Tabs/Fof/index.tsx";
import Investment from "@/pages/Tabs/Investment/index.tsx";
import My from "@/pages/Tabs/My/index.tsx";
import { Navigate } from "react-router-dom";

const tabRoutes = () => {
    return [
        {
            path: "/tab",
            element: <TabWrapper />,
            children: [
                {
                    index: true,
                    element: <Navigate to={"/tab/home"} replace />
                },
                {
                    path: "home",
                    element: <Home />,
                    cache: true
                },
                {
                    path: "choose",
                    element: <Choose />,
                    cache: true
                },
                {
                    path: "investment",
                    element: <Investment />,
                    cache: true
                },
                {
                    path: "fof",
                    element: <Fof />,
                    cache: true
                },
                {
                    path: "my",
                    element: <My />,
                    cache: true
                }
            ]
        }
    ];
};

export default tabRoutes();
