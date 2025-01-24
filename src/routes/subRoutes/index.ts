import React from "react";

const routerConfigList = [
    {
        path: "/home",
        component: React.lazy(() => import("@/pages/Home/index.tsx")),
        cache: true
    },
    {
        path: "/mobx",
        component: React.lazy(() => import("@/pages/Mobx/index.tsx")),
        cache: true
    },
    {
        path: "/demo/:productId",
        component: React.lazy(() => import("@/pages/Product/Demo1/index.tsx"))
    }
];

export default routerConfigList;
