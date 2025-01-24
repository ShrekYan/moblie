import { useRoutes } from "react-router-dom";
import { getCacheRoute } from "./handle.tsx";
import AuthComponent from "./AuthComponent.tsx";
import AutoLogin from "./AutoLogin.tsx";
import tabRoutes from "./tabRoutes.tsx";

/**
 * todo 去除any定义
 * todo 使用React-router-domv6 404 重定向
 * @param routes
 */
const generateRouter = (routes: any) => {
    return routes.map((item: any) => {
        if (item?.children?.length > 0) {
            item.children = generateRouter(item.children);
        }
        //todo  xxxx
        const CacheRoute = getCacheRoute(item);
        item.element = <AuthComponent routeConfig={item} component={CacheRoute} />;
        return item;
    });
};

//生成路由列表
const tempRouteList = generateRouter(tabRoutes);

export default () => {
    const RouteList = useRoutes(tempRouteList);
    return <AutoLogin RouteList={RouteList} />;
};
