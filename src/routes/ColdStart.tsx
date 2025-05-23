import React, { useEffect, useState } from "react";
import useApi from "@/utils/http/useApi.ts";
import { PageLoading } from "react-awesome-all-component";
import useFetchByPromise from "@/utils/http/useFetchByPromise.ts";
import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import { BOSS_CONFIG } from "@/utils/constants/constants.ts";
import SDKLoad from "@/core-tools/sdk/SdkLoad.tsx";
import GlobalConfig from "@/components/business/GlobalConfig/index.tsx";

/**
 * 冷启动：冷启动是指程序或系统从完全关闭的状态重新启动
 * 全局接口初始化、自动登录、sdk加载
 * @param RouteList
 * @constructor
 */
const ColdStart: React.FC<{ RouteList: React.ReactElement }> = ({ RouteList }) => {
    const [show, setShow] = useState(false);
    const api = useApi();
    const localStorage = useLocalStorage();
    //进入页面进行查询全局配置（全局接口初始化工作）
    const { data } = useFetchByPromise(api.config.qryBossConfiguration({}));
    //数据加载完成
    useEffect(() => {
        if (data) {
            localStorage.setItem(BOSS_CONFIG, data.data);
            setShow(true);
        }
    }, [data]);

    return show ? (
        <>
            {/*全局配置加载*/}
            <GlobalConfig />
            <SDKLoad RouteList={RouteList} />
        </>
    ) : (
        <PageLoading />
    );
};

export default ColdStart;
