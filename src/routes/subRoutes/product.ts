import { lazy } from "react";

const productRoutes = [
    {
        path: "/product",
        component: lazy(() => import("@/pages/Product/index.tsx")),
        children: [
            {
                path: "rateStructure/:productId",
                component: lazy(() => import("@/pages/Product/RateStructure")),
                parentPath: "/product"
            }
        ]
    }
];

export default productRoutes;
