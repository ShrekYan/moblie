import React from "react";
import { Button } from "antd-mobile";
import useCacheUserInfo from "@/biz/useCacheUserInfo.ts";

const LoginPage: React.FC = () => {
    const { setCachedUserInfo } = useCacheUserInfo();

    /**
     * 登陆获取用户信息
     */
    const handleLogin = () => {
        setCachedUserInfo({ userId: "123x", sessionId: "321x" });
    };
    return (
        <Button type="button" color="primary" onClick={handleLogin}>
            登陆获取用户信息
        </Button>
    );
};

export default LoginPage;
