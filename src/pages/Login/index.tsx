import React from "react";
import { Button } from "antd-mobile";
import useCacheUserInfo from "@/business/useCacheUserInfo.ts";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

const LoginPage: React.FC = () => {
    const { setCachedUserInfo } = useCacheUserInfo();
    const location = useLocation();
    const { backPath } = queryString.parse(location.search);
    const navigate = useNavigate();

    /**
     * 登陆获取用户信息
     */
    const handleLogin = () => {
        //todo mock add userInfo
        setCachedUserInfo({ userId: "123x", sessionId: "321x" });
        if (backPath) {
            navigate(backPath as string, { replace: true });
        } else {
            navigate({ pathname: "/tab/home" });
        }
    };
    return (
        <Button type="button" color="primary" onClick={handleLogin}>
            登陆获取用户信息
        </Button>
    );
};

export default LoginPage;
