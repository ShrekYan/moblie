import React, { Suspense } from "react";
import KeepAlive from "react-activation";
import PageLoading from "./PageLoading.tsx";

const CacheRoute: React.FC<any> = ({ routeItemConfig }) => {
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
                            <routeItemConfig.component />
                        ) : (
                            routeItemConfig.element
                        )}
                    </Suspense>
                </KeepAlive>
            ) : (
                <Suspense fallback={<PageLoading />}>
                    {routeItemConfig.component ? (
                        <routeItemConfig.component />
                    ) : (
                        routeItemConfig.element
                    )}
                </Suspense>
            )}
        </>
    );
};

export default CacheRoute;
