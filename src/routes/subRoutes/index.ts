import productRoutes from "./product.ts";
import demoRoutes from "./demo.ts";

const bizRoutes = [...productRoutes, ...demoRoutes];

export default bizRoutes;
