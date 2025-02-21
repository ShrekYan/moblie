import React from "react";
import { Navigate } from "react-router-dom";
import type { routeConfig } from "@/routes/index.tsx";

/**
 * 权限组件
 * @param component
 * @param routeConfig
 * @constructor
 */
const AuthComponent: React.FC<{
    component?: React.ReactElement;
    routeConfig: routeConfig;
}> = ({ component, routeConfig }) => {
    if (routeConfig.path === "my") {
        return <Navigate to={"/tab/home"} />;
    }
    return component;
};

export default AuthComponent;
