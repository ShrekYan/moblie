import { BossConfigurationItem } from "@/types/responses/config/qryBossConfiguration.ts";
import { pageMap } from "./pageMap.ts";
import { match } from "path-to-regexp";
import { getEmitter } from "@/utils/event/useEventEmitter.ts";
import type { EventEmitter } from "@/types/common/event/eventEmitter.ts";

//定义策略处理函数类型
type StrategyHandler = (path: string, data: BossConfigurationItem) => void;

/**
 * 根据路由path过滤配置数据
 * @param path
 * @param data
 */
const filterDataByRoutePath = (path: string, data: BossConfigurationItem) => {
    const _tempArray: BossConfigurationItem = [];
    data?.map((configItem: BossConfigurationItem[0]) => {
        //通过接口字段affiliatedPage映射路由配置表
        const routePathArray = pageMap[configItem.affiliatedPage];
        //与当前路由path进行匹配，匹配成功后添加配置
        if (routePathArray) {
            routePathArray.map((matchPath: string) => {
                const matchFn = match(matchPath);
                //匹配成功后添加配置信息
                if (matchFn(path)) {
                    _tempArray.push(configItem);
                }
            });
        }
    });
    return _tempArray;
};

/**
 * 创建策略对象句柄
 */
const createStrategyHandler = (): Record<string, StrategyHandler> => {
    const emitter = getEmitter<EventEmitter>();
    return {
        bigScreenAdList: (pathname, data) => {
            const filteredData = filterDataByRoutePath(pathname, data);
            emitter.trigger("bigScreenAdList", filteredData);
        },
        buoyList: (pathname, data) => {
            const filteredData = filterDataByRoutePath(pathname, data);
            emitter.trigger("buoyList", filteredData);
        }
    };
};

// 策略对象显式类型定义
export const strategy = createStrategyHandler();
