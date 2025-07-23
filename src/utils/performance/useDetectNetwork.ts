import { useEffect, useState } from "react";

const useDetectNetwork = () => {
    //true:weak（弱网络）、false:stable（稳定的网络）
    const [isWeakNetwork, setIsWeakNetwork] = useState(false);

    const detectNetwork = () => {
        if (!window.navigator.connection) return;

        const con: any = window.navigator["connection"];
        // 1. 网络类型判断（2G/3G/慢速2G）
        if (con.effectiveType) {
            const slowNetworks = ["slow-2g", "2g", "3g"];
            setIsWeakNetwork(slowNetworks.includes(con.effectiveType));
        }
        // 2. 网络速度阈值（下行<2Mbps 或 RTT>200ms）
        if (con.downlink !== undefined && con.rtt !== undefined) {
            setIsWeakNetwork(con.downlink < 2 || con.rtt > 200);
        }
    };

    useEffect(() => {
        if (navigator.connection) {
            navigator.connection.addEventListener("change", detectNetwork);
        }
        return () => {
            if (navigator.connection) {
                navigator.connection.removeEventListener("change", detectNetwork);
            }
        };
    }, []);

    return isWeakNetwork;
};

export default useDetectNetwork;
