import type { RouteObject } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import { getRouteComponent } from "./handle.tsx";
import Interceptor from "./Interceptor.tsx";
import ColdStart from "@/routes/ColdStart.tsx";
import tabRoutes from "./tabRoutes.tsx";
import subRoutes from "./subRoutes";
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

export default () => {
    const [subRoutes1, setSubRoutes1] = React.useState<RouteConfig[]>([]);

    React.useEffect(() => {
        const SubAppLayout = React.lazy(() => import("reactSubapp/Router"));
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
        // 动态加载子应用路由配置
        import("reactSubapp/routes")
            .then((module) => {
                setSubRoutes1([
                    ...allRouteList,
                    {
                        path: "/subapp/*", // 关键：使用通配符匹配子应用路径
                        element: (
                            <React.Suspense>
                                {/*可以设置用户信息等等，相关操作*/}
                                <SubAppLayout />
                            </React.Suspense>
                        ), // 子应用的布局容器
                        children: module.default as any // 导入子应用的路由配置（见Step 2）
                    }
                ] as RouteConfig[]);
            })
            .catch(() => {
                //如果加载失败，使用同步路由配置
                setSubRoutes1(allRouteList);
            });
    }, []);
    const RouteList = useRoutes(subRoutes1) as React.ReactElement;
    return <ColdStart RouteList={RouteList} />;
};
