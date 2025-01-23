import React from "react";
import { Navigate } from "react-router-dom";

const AuthComponent: React.FC<any> = ({ component, routeConfig }) => {
    if (routeConfig.path === "/mobx") {
        return <Navigate to={"/home"} />;
    }
    return component;
};

export default AuthComponent;
