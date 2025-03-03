import productRoutes from "./product.ts";
import demoRoutes from "./demo.ts";
import { RouteConfig } from "@/routes";

const bizRoutes: RouteConfig[] = [...productRoutes, ...demoRoutes];

export default bizRoutes;
