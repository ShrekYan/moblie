import { lazy } from "react";
import type { RouteConfig } from "@/routes";

const loginRoutes: RouteConfig[] = [
    {
        path: "/login",
        component: lazy(() => import("@/pages/Login/index.tsx")),
        pageName: "登陆页面"
    }
];

export default loginRoutes;
