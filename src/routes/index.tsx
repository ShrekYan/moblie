import { Navigate, useRoutes } from "react-router-dom";
import { getRouteComponent } from "./handle.tsx";
import AuthComponent from "./AuthComponent.tsx";
import AutoLogin from "./AutoLogin.tsx";
import tabRoutes from "./tabRoutes.tsx";
import subRoutes from "./subRoutes";
import type { RouteObject } from "react-router-dom";

/**
 * 生成路由信息
 * @param routes
 */
const generateRouter = (routes: RouteObject[]) => {
    return routes.map((item: RouteObject) => {
        if (item.children && item.children.length > 0) {
            item.children = generateRouter(item.children);
        }
        //获取路由信息，包含缓存路由和非缓存路由，根据cache参数配置生成
        const RouteComponent = getRouteComponent(item);
        item.element = <AuthComponent routeConfig={item} component={RouteComponent} />;
        return item;
    });
};

//生成路由列表
const allRouteList = generateRouter([
    ...tabRoutes,
    ...subRoutes,
    {
        //页面404时跳转到首页
        path: "*",
        element: <Navigate to={"/tab/home"} replace />
    }
]);

export default () => {
    const RouteList = useRoutes(allRouteList);
    return <AutoLogin RouteList={RouteList} />;
};
