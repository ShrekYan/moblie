import React, { useState, useEffect } from "react";
import PageLoading from "./PageLoading.tsx";

const AutoLogin: React.FC<any> = ({ RouteList }) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 1000);
    }, []);
    return isShow ? RouteList : <PageLoading />;
};

export default AutoLogin;
