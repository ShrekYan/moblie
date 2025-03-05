import { lazy } from "react";
import type { RouteConfig } from "@/routes";

const accountRoutes: RouteConfig[] = [
    {
        path: "account",
        component: lazy(() => import("@/pages/Account/index.tsx")),
        pageName: "账号路由容器",
        children: [
            {
                path: "set",
                component: lazy(() => import("@/pages/Account/Set/index.tsx")),
                pageName: "账户设置"
            },
            {
                path: "profile",
                component: lazy(() => import("@/pages/Account/Profile/index.tsx")),
                pageName: "我的资料"
            }
        ]
    }
];

export default accountRoutes;
