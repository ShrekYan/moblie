import { Suspense } from "react";
import KeepAlive from "react-activation";
import PageLoading from "./PageLoading.tsx";
import type { routeConfig } from "@/routes/index.tsx";

export const getRouteComponent = (routeItemConfig: routeConfig) => {
    //是否为带有缓存路由标示
    const cacheFlag = routeItemConfig.cache;
    const Component = routeItemConfig.component;
    //全路径
    let fullPath;
    if (routeItemConfig.parentPath) {
        fullPath = routeItemConfig?.parentPath + "/" + routeItemConfig.path;
    } else {
        fullPath = routeItemConfig.path;
    }
    return (
        <>
            {cacheFlag ? (
                <KeepAlive
                    cacheKey={fullPath}
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
