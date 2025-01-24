import { lazy } from "react";

const productRoutes = [
    {
        path: "/product/rateStructure/:productId",
        component: lazy(() => import("@/pages/Product/RateStructure"))
    }
];

export default productRoutes;
