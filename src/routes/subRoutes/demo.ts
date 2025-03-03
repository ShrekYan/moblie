import { lazy } from "react";

const DemoRoutes = [
    {
        path: "/demo",
        component: lazy(() => import("@/pages/Demo/index.tsx")),
        children: [
            {
                path: "reactUse",
                component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx")),
                children: [
                    {
                        path: "test",
                        component: lazy(() => import("@/pages/Demo/ReactUse/Test/index.tsx"))
                    }
                ]
            },
            {
                path: "useCallbackRef",
                component: lazy(() => import("@/pages/Demo/UseCallbackRef/index.tsx"))
            },
            {
                path: "sortable",
                component: lazy(() => import("@/pages/Demo/SortableContainer/index.tsx"))
            },
            {
                path: "removeScroll",
                component: lazy(() => import("@/pages/Demo/RemoveScroll/index.tsx"))
            }
        ]
    }
];

export default DemoRoutes;
