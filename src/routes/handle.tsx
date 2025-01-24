import React from "react";
import { Suspense } from "react";
import KeepAlive from "react-activation";
import PageLoading from "./PageLoading.tsx";
import type { RouteObject } from "react-router-dom";

type routeConfig = RouteObject & { cache?: boolean; component?: React.ComponentType<any> };

export const getRouteComponent = (routeItemConfig: routeConfig) => {
    //是否为带有缓存路由标示
    const cacheFlag = routeItemConfig.cache;
    const Component = routeItemConfig.component;

    return (
        <>
            {cacheFlag ? (
                <KeepAlive
                    cacheKey={routeItemConfig.path}
                    id={routeItemConfig.path}
                    name={routeItemConfig.path}
                >
                    <Suspense fallback={<PageLoading />}>
                        {routeItemConfig.component ? (
                            Component ? (
                                <Component {...routeItemConfig} />
                            ) : (
                                routeItemConfig.element
                            )
                        ) : (
                            routeItemConfig.element
                        )}
                    </Suspense>
                </KeepAlive>
            ) : (
                <Suspense fallback={<PageLoading />}>
                    {routeItemConfig.component ? (
                        Component ? (
                            <Component {...routeItemConfig} />
                        ) : (
                            routeItemConfig.element
                        )
                    ) : (
                        routeItemConfig.element
                    )}
                </Suspense>
            )}
        </>
    );
};
