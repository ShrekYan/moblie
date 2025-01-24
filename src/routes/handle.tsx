import { Suspense } from "react";
import KeepAlive from "react-activation";
import PageLoading from "./PageLoading.tsx";

export const getCacheRoute = (routeItemConfig: any) => {
    //是否为带有缓存路由标示
    const cacheFlag = routeItemConfig.cache;
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
                            <routeItemConfig.component {...routeItemConfig} />
                        ) : (
                            routeItemConfig.element
                        )}
                    </Suspense>
                </KeepAlive>
            ) : (
                <Suspense fallback={<PageLoading />}>
                    {routeItemConfig.component ? (
                        <routeItemConfig.component {...routeItemConfig} />
                    ) : (
                        routeItemConfig.element
                    )}
                </Suspense>
            )}
        </>
    );
};
