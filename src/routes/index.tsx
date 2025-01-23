import { useRoutes } from "react-router-dom";
//Navigate
// import KeepAlive from "react-activation";
// import PageLoading from "./PageLoading.tsx";
import CacheRoute from "./CacheRoute.tsx";
import AuthComponent from "./AuthComponent.tsx";
import AutoLogin from "./AutoLogin.tsx";
// import routerConfigList from "./subRoutes/index.ts";
import tabRoutes from "./tabRoutes.tsx";

/**
 * todo 去除any定义
 * @param routes
 */
const generateRouter = (routes: any) => {
    return routes.map((item: any) => {
        if (item.children) {
            item.children = generateRouter(item.children);
        }
        item.element = (
            <AuthComponent routeConfig={item} component={<CacheRoute routeItemConfig={item} />} />
        );
        return item;
    });
};

export default () => {
    //生成RouteList
    const RouteList = useRoutes(generateRouter(tabRoutes));
    return <AutoLogin RouteList={RouteList} />;
};
