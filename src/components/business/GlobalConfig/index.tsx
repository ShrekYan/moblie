import React, { useEffect } from "react";
import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import { BOSS_CONFIG } from "@/utils/constants/constants.ts";
import { useLocation } from "react-router-dom";
import type { BossConfigurationListResponse } from "@/types/responses/config/qryBossConfiguration.ts";
import { strategy } from "./handle.ts";
import BigScreenAd from "./components/BigScreenAd/index.tsx";

const GlobalConfig: React.FC = () => {
    const localStorage = useLocalStorage();
    //获取boss配置信息信息
    const bossConfig = localStorage.getItem<BossConfigurationListResponse>(BOSS_CONFIG);
    const location = useLocation();
    //路由发生改变时执行全局配置逻辑
    useEffect(() => {
        const pathname = location.pathname;
        Object.entries(bossConfig || {}).forEach(([key, value]) => {
            //获取策略处理
            const handler = strategy[key];
            //执行策略
            if (handler) {
                handler(pathname, value);
            }
        });
    }, [location.pathname]);

    return (
        <>
            <BigScreenAd />
        </>
    );
};

export default GlobalConfig;
