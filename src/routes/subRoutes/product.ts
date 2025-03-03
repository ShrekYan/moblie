import { lazy } from "react";
import type { RouteConfig } from "@/routes";

const productRoutes: RouteConfig[] = [
    {
        path: "/product",
        component: lazy(() => import("@/pages/Product/index.tsx")),
        pageName: "产品路由容器",
        children: [
            {
                path: "rateStructure/:productId",
                component: lazy(() => import("@/pages/Product/RateStructure")),
                pageName: "产品费效率结构页面"
            }
        ]
    }
];

export default productRoutes;
