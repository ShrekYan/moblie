import TabWrapper from "@/pages/Tabs/index.tsx";
import Home from "@/pages/Tabs/Home/index.tsx";
import Choose from "@/pages/Tabs/Choose/index.tsx";
import Fof from "@/pages/Tabs/Fof/index.tsx";
import Investment from "@/pages/Tabs/Investment/index.tsx";
import My from "@/pages/Tabs/My/index.tsx";
import { Navigate } from "react-router-dom";
import type { RouteConfig } from "@/routes/index.tsx";

const tabRoutes = (): RouteConfig[] => {
    return [
        {
            path: "/tab",
            component: TabWrapper,
            pageName: "tab路由容器",
            children: [
                {
                    index: true,
                    component: <Navigate to={"/tab/home"} replace />,
                    pageName: "重定向跳转到tab/home"
                },
                {
                    path: "home",
                    component: Home,
                    cache: true,
                    pageName: "首页"
                },
                {
                    path: "choose",
                    component: Choose,
                    cache: true,
                    pageName: "自选"
                },
                {
                    path: "investment",
                    component: Investment,
                    cache: true,
                    pageName: "投资理财"
                },
                {
                    path: "fof",
                    component: Fof,
                    cache: true,
                    pageName: "头骨"
                },
                {
                    path: "my",
                    component: My,
                    cache: true,
                    pageName: "我的"
                }
            ]
        }
    ];
};

export default tabRoutes();
