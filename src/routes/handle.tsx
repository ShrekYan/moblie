import React from "react";
import { Suspense } from "react";
import KeepAlive from "react-activation";
import { PageLoading } from "react-awesome-all-component";
import type { RouteConfig } from "@/routes/index.tsx";

export const getRouteComponent = (routeItemConfig: RouteConfig) => {
    //是否为带有缓存路由标示
    const cacheFlag = routeItemConfig.cache;
    //JSXElementConstructor
    const Component = routeItemConfig.component as React.JSXElementConstructor<any>;

    //全路径
    const fullPath = routeItemConfig.fullPath;
    //是否为组件实例
    const isValidElement = React.isValidElement(routeItemConfig.component);

    return (
        <>
            {cacheFlag ? (
                <KeepAlive cacheKey={fullPath} id={routeItemConfig.path} name={fullPath}>
                    <Suspense fallback={<PageLoading />}>
                        {routeItemConfig.component ? (
                            Component && !isValidElement ? (
                                /*JSXElementConstructor*/
                                <Component routeItemConfig={routeItemConfig} />
                            ) : (
                                /*组件实例*/
                                React.cloneElement(
                                    routeItemConfig.component as React.ReactElement,
                                    {
                                        routeItemConfig: routeItemConfig
                                    } as React.Attributes
                                )
                            )
                        ) : (
                            React.cloneElement(
                                routeItemConfig.element as React.ReactElement,
                                {
                                    routeItemConfig: routeItemConfig
                                } as React.Attributes
                            )
                        )}
                    </Suspense>
                </KeepAlive>
            ) : (
                <Suspense fallback={<PageLoading />}>
                    {routeItemConfig.component ? (
                        Component && !isValidElement ? (
                            /*JSXElementConstructor*/
                            <Component {...routeItemConfig} />
                        ) : (
                            /*组件实例*/
                            React.cloneElement(
                                routeItemConfig.component as React.ReactElement,
                                {
                                    routeItemConfig: routeItemConfig
                                } as React.Attributes
                            )
                        )
                    ) : (
                        /*组件实例*/
                        React.cloneElement(
                            routeItemConfig.element as React.ReactElement,
                            {
                                routeItemConfig: routeItemConfig
                            } as React.Attributes
                        )
                    )}
                </Suspense>
            )}
        </>
    );
};
