import { useRoutes, Navigate } from "react-router-dom";
import { getRouteComponent } from "./handle.tsx";
import Interceptor from "./Interceptor.tsx";
import ColdStart from "@/routes/ColdStart.tsx";
import tabRoutes from "./tabRoutes.tsx";
import subRoutes from "./subRoutes";
import type { RouteObject } from "react-router-dom";
import React from "react";

export type RouteConfig = RouteObject & {
    cache?: boolean;
    component?:
        | React.LazyExoticComponent<any>
        | React.ReactElement
        | React.JSXElementConstructor<any>;
    parentPath?: string;
    fullPath?: string;
    children?: RouteConfig[];
    pageName: string;
};

/**
 *  自动生成完整路径
 * @param routes
 * @param parentPath
 */
const enhanceRoutes = (routes: RouteConfig[], parentPath = ""): RouteConfig[] => {
    return routes.map((route) => {
        const currentPath = route.path ? route.path : "";
        const path = (parentPath + "/" + currentPath).replace(/\/+/g, "/");
        return {
            ...route,
            //路由全路地址
            fullPath: path,
            children: route.children ? enhanceRoutes(route.children, path || "") : undefined
        };
    }) as RouteConfig[];
};

/**
 * 生成路由信息
 * @param routes
 */
const generateRouter = (routes: RouteConfig[]) => {
    return routes.map((item: RouteConfig) => {
        if (item.children && item.children.length > 0) {
            item.children = generateRouter(item.children);
        }
        //获取路由信息，包含缓存路由和非缓存路由，根据cache参数配置生成
        const RouteComponent = getRouteComponent(item);
        item.element = <Interceptor routeConfig={item} component={RouteComponent} />;
        return item;
    });
};

//生成路由列表
const allRouteList = generateRouter(
    enhanceRoutes([
        ...tabRoutes,
        ...subRoutes,
        {
            //页面404时跳转到首页
            path: "*",
            component: <Navigate to={"/tab/home"} replace />,
            pageName: "404"
        }
    ])
);

export default () => {
    const RouteList = useRoutes(allRouteList) as React.ReactElement;
    return <ColdStart RouteList={RouteList} />;
};
