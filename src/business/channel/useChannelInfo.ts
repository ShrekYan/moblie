import { useCallback } from "react";
import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import { CHANNEL_INFO } from "@/utils/constants/constants.channel.ts";

const useChannelInfo = <T = any>() => {
    const localStorage = useLocalStorage();

    /**
     * 获取渠道信息
     */
    const getChannelInfo = useCallback((): T | null => {
        return localStorage.getItem<T>(CHANNEL_INFO);
    }, []);

    /**
     * 设置渠道信息
     */
    const setChannelInfo = useCallback((data: T) => {
        return localStorage.setItem<T>(CHANNEL_INFO, data);
    }, []);

    return {
        getChannelInfo,
        setChannelInfo
    };
};

export default useChannelInfo;
