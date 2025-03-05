import productRoutes from "./product.ts";
import demoRoutes from "./demo.ts";
import accountRoutes from "./account.ts";
import loginRoutes from "./login.ts";
import { RouteConfig } from "@/routes";

const bizRoutes: RouteConfig[] = [
    ...productRoutes,
    ...demoRoutes,
    ...accountRoutes,
    ...loginRoutes
];

export default bizRoutes;
