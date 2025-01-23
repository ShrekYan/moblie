import React from "react";

const routerConfigList = [
    // {
    //     path: "/",
    //     element: <Navigate to="/home" replace />
    //     // component: React.lazy(() => import("./../pages/Home/index.tsx")),
    // },
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
    },
    {
        //todo 使用重定向？？？
        path: "*",
        component: React.lazy(() => import("@/pages/Home/index.tsx"))
    }
];

export default routerConfigList;
