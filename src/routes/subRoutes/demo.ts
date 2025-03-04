import { lazy } from "react";
import type { RouteConfig } from "@/routes";

const DemoRoutes: RouteConfig[] = [
    {
        path: "/demo",
        component: lazy(() => import("@/pages/Demo/index.tsx")),
        pageName: "demo路由容器",
        children: [
            {
                path: "reactUse",
                component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx")),
                children: [
                    {
                        path: "test",
                        component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx")),
                        pageName: "测试页面"
                    }
                ],
                pageName: "reactUse路由容器"
            },
            {
                path: "useCallbackRef",
                component: lazy(() => import("@/pages/Demo/UseCallbackRef/index.tsx")),
                pageName: "useCallbackRef"
            },
            {
                path: "sortable",
                component: lazy(() => import("@/pages/Demo/SortableContainer/index.tsx")),
                pageName: "sortable"
            },
            {
                path: "removeScroll",
                component: lazy(() => import("@/pages/Demo/RemoveScroll/index.tsx")),
                pageName: "removeScroll"
            },
            {
                path: "reactIs",
                component: lazy(() => import("@/pages/Demo/ReactIs/index.tsx")),
                pageName: "reactIs"
            },
            {
                path: "inputAutoSize",
                component: lazy(() => import("@/pages/Demo/InputAutoSize/index.tsx")),
                pageName: "inputAutoSize"
            },
            {
                path: "infiniteScroller",
                component: lazy(() => import("@/pages/Demo/InfiniteScroller/index.tsx")),
                pageName: "infiniteScroller"
            },
            {
                path: "marquee",
                component: lazy(() => import("@/pages/Demo/Marquee/index.tsx")),
                pageName: "marquee"
            },
            {
                path: "countUp",
                component: lazy(() => import("@/pages/Demo/CountUp/index.tsx")),
                pageName: "countUp"
            }
        ]
    }
];

export default DemoRoutes;
