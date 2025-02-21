import React, { useState, useEffect } from "react";
import PageLoading from "./PageLoading.tsx";

/**
 * 冷启动：冷启动是指程序或系统从完全关闭的状态重新启动
 * todo 全局接口初始化、自动登录、sdk加载
 * @param RouteList
 * @constructor
 */
const ColdStart: React.FC<any> = ({ RouteList }) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);
    return isShow ? RouteList : <PageLoading />;
};

export default ColdStart;
