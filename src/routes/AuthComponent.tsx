import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import type { RouteConfig } from "@/routes/index.tsx";
import { getAuthConfig, getIgnoreAuthConfig } from "./loginAuthorityConfig.ts";
import useCacheUserInfo from "@/biz/useCacheUserInfo.ts";
import type { UserInfoModal } from "@/types/common/userInfoModal.ts";

/**
 * 检查忽略登陆权限配置
 * @param routeConfig
 */
const checkLoginIgnoreAuthConfig = (routeConfig: RouteConfig) => {
    //忽略权限配置
    const ignoreAuthConfig = getIgnoreAuthConfig();
    for (const ignoreKey in ignoreAuthConfig) {
        const ignoreItem = ignoreAuthConfig[ignoreKey];
        if (typeof ignoreItem === "string") {
            const splitArray = routeConfig?.fullPath?.split("/");
            const parentRoutePath = splitArray?.[1];
            if (parentRoutePath === ignoreItem) {
                return true;
            }
        } else {
            for (let i = 0, j = ignoreItem?.length; i < j; i++) {
                const fullPath = routeConfig.fullPath || "";
                if (fullPath.indexOf(ignoreItem?.[i]) > -1) {
                    return true;
                }
            }
        }
    }
    return false;
};

/**
 * 检查登陆权限配置
 * @param routeConfig
 */
const checkLoginAuthenticated = (routeConfig: RouteConfig) => {
    //获取权限配置
    const authConfig = getAuthConfig();
    for (const authKey in authConfig) {
        const authItem = authConfig[authKey];
        if (typeof authItem === "string") {
            const splitArray = routeConfig?.fullPath?.split("/");
            const parentRoutePath = splitArray?.[1];
            if (parentRoutePath === authItem) {
                return true;
            }
        } else {
            for (let i = 0, j = authItem?.length; i < j; i++) {
                const fullPath = routeConfig.fullPath || "";
                if (fullPath.indexOf(authItem?.[i]) > -1) {
                    return true;
                }
            }
        }
    }
    return false;
};

const checkLoginAuthConfig = (routeConfig: RouteConfig) => {
    //登陆页面也无需
    if (routeConfig.fullPath === "/login") {
        return false;
    }
    //如果存在忽略权限配置并且路由命中，则不需要进行权限验证
    if (checkLoginIgnoreAuthConfig(routeConfig)) {
        return false;
    }
    //如果存在权限配置并且路由命中，则需要进行权限验证
    if (checkLoginAuthenticated(routeConfig)) {
        return true;
    }
    return false;
};

/**
 * 权限组件
 * @param component
 * @param routeConfig
 * @constructor
 */
const AuthComponent: React.FC<{
    component?: React.ReactElement;
    routeConfig: RouteConfig;
}> = ({ component, routeConfig }) => {
    //用户信息
    const [userInfo, setUserInfo] = useState<UserInfoModal>();
    const [showPage, setShowPage] = useState(false);

    const { getCachedUserInfo } = useCacheUserInfo();
    //根据路由变化每一次都从缓存中获取缓存用户信息
    useEffect(() => {
        //获取缓存用户信息
        getCachedUserInfo().then((cacheUserInfo) => {
            //设置用户缓存信息
            setUserInfo(cacheUserInfo as UserInfoModal);
            setShowPage(true);
        });
    }, [routeConfig.fullPath]);

    if (showPage) {
        //进行验证登陆权限配置
        if (checkLoginAuthConfig(routeConfig)) {
            //如果需要进行登陆权限授权
            if (!userInfo) {
                return <Navigate to="/login" replace={true} />;
            }
        }
        return component;
    }
    return null;
};

export default AuthComponent;
