import React, { useCallback } from "react";
import { useAliveController } from "react-activation";
import type { RouteObject } from "react-router-dom";

export type routeConfig = RouteObject & {
    cache?: boolean;
    component?: React.ComponentType<any>;
    parentPath?: string;
};

const useClearCacheRoutesByNotTabs = (routeConfig: routeConfig) => {
    const { clear, getCachingNodes } = useAliveController();
    /**
     * 清空缓存nodes
     */
    const clearCacheNodes = useCallback(() => {
        if (routeConfig) {
            //父级路由片段
            const parentPath = routeConfig?.parentPath || "";
            //当前路由path
            const currentPath = routeConfig?.path;
            //全路径path
            let fullPath;
            if (parentPath) {
                fullPath = parentPath + "/" + currentPath;
            } else {
                fullPath = currentPath;
            }
            //跳转非tab时需要清空所有的缓存节点
            if (fullPath?.indexOf("/tab") === -1) {
                //获取缓存对象数量
                const cacheNodes = getCachingNodes();
                //有缓存节点再进行清理
                if (cacheNodes?.length > 0) {
                    //清空所有的缓存节点数据
                    clear();
                }
            }
        }
    }, [routeConfig]);
    return clearCacheNodes;
};

export default useClearCacheRoutesByNotTabs;
