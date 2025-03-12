import React from "react";
import { useNetworkState } from "react-use";
import style from "./index.module.scss";

const Network: React.FC = () => {
    const { online } = useNetworkState();

    const handleRefresh = () => {
        location.reload();
    };

    return (
        <>
            {!online && (
                <div className={style.networkWrap}>
                    <div className={style.netWork}>
                        <div className={style.container}>
                            无网络连接，请尝试刷新页面。
                            <div className={style.refresh} onClick={handleRefresh}>
                                刷新页面
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Network;
