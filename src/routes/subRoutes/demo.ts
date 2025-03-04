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
            },
            {
                path: "queryString",
                component: lazy(() => import("@/pages/Demo/QueryString/index.tsx")),
                pageName: "queryString"
            },
            {
                path: "qrCode",
                component: lazy(() => import("@/pages/Demo/Qrcode/index.tsx")),
                pageName: "qrCode"
            },
            {
                path: "pdf",
                component: lazy(() => import("@/pages/Demo/PdfH5/index.tsx")),
                pageName: "pdf"
            },
            {
                path: "pathRegexp",
                component: lazy(() => import("@/pages/Demo/PathRegexp/index.tsx")),
                pageName: "pathRegexp"
            },
            {
                path: "numeral",
                component: lazy(() => import("@/pages/Demo/Numeral/index.tsx")),
                pageName: "numeral"
            },
            {
                path: "localforage",
                component: lazy(() => import("@/pages/Demo/Localforage/index.tsx")),
                pageName: "localforage"
            },
            {
                path: "HTML2Canvas",
                component: lazy(() => import("@/pages/Demo/HTML2Canvas/index.tsx")),
                pageName: "HTML2Canvas"
            }
        ]
    }
];

export default DemoRoutes;
