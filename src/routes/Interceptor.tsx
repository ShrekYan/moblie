import React from "react";
import AuthComponent from "./AuthComponent.tsx";
import useClearCacheRoutesByNotTabs from "@/utils/route/useClearCacheRoutesByNotTabs.ts";
import type { RouteConfig } from "@/routes/index.tsx";

/**
 * 拦截器
 * @param component
 * @param routeConfig
 * @constructor
 */
const Interceptor: React.FC<{
    component?: React.ReactElement;
    routeConfig: RouteConfig;
}> = ({ component, routeConfig }) => {
    const clearCacheNodes = useClearCacheRoutesByNotTabs(routeConfig);
    //跳转非tab时需要清空所有的缓存节点
    clearCacheNodes();
    return <AuthComponent component={component} routeConfig={routeConfig} />;
};

export default Interceptor;
