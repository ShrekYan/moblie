import React from "react";
import { useRoutes } from "react-router-dom";
//Navigate
// import KeepAlive from "react-activation";
// import PageLoading from "./PageLoading.tsx";
import CacheRoute from "./CacheRoute.tsx";
import AuthComponent from "./AuthComponent.tsx";
import AutoLogin from "./AutoLogin.tsx";

const routerConfigList = [
    {
        path: "/",
        //element: <Navigate to="/home" replace />
        component: React.lazy(() => import("./../pages/Home/index.tsx"))
    },
    {
        path: "/home",
        component: React.lazy(() => import("./../pages/Home/index.tsx")),
        cache: true
    },
    {
        path: "/mobx",
        component: React.lazy(() => import("./../pages/Mobx/index.tsx")),
        cache: true
    },
    {
        path: "*",
        component: React.lazy(() => import("./../pages/Home/index.tsx"))
    }
];

const generateRouter = (routes: any) => {
    return routes.map((item: any) => {
        console.log("for");
        if (item.children) {
            item.children = generateRouter(item.children);
        }
        item.element = (
            <AuthComponent routeConfig={item} component={<CacheRoute routeItemConfig={item} />} />
        );
        return item;
    });
};

// export default createHashRouter(generateRouter(routerConfigList));

export default () => {
    //生成RouteList
    const RouteList = useRoutes(generateRouter(routerConfigList));
    return <AutoLogin RouteList={RouteList} />;
};
