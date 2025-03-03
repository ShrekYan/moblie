import { lazy } from "react";

const DemoRoutes = [
    {
        path: "/demo",
        component: lazy(() => import("@/pages/Demo/index.tsx")),
        children: [
            {
                path: "reactUse",
                component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx")),
                parentPath: "/demo",
                children: [
                    {
                        path: "test",
                        component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx")),
                        parentPath: "/demo/reactUse"
                    }
                ]
            },
            {
                path: "useCallbackRef",
                component: lazy(() => import("@/pages/Demo/UseCallbackRef/index.tsx")),
                parentPath: "/demo"
            }
        ]
    }
];

export default DemoRoutes;
