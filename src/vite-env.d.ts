/// <reference types="vite/client" />

declare const VITE_API_URL: string;

declare module "reactSubapp/Router" {
    import { ComponentType } from "react";
    const Router: ComponentType;
    export default Router;
}

declare module "reactSubapp/routes" {
    import type { RouteObject } from "react-router-dom";
    const routes: RouteObject[];
    export default routes;
}
