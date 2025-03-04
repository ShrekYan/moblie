import { useCallback } from "react";
import { useAliveController } from "react-activation";
import type { RouteConfig } from "@/routes";

const useClearCacheRoutesByNotTabs = (routeConfig: RouteConfig) => {
    const { clear, getCachingNodes } = useAliveController();
    /**
     * 清空缓存nodes
     */
    const clearCacheNodes = useCallback(() => {
        if (routeConfig) {
            //全路径path
            const fullPath = routeConfig?.fullPath || "";
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
