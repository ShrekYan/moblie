import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import type { ChannelConfig, ChannelInfo } from "@/types/common/channel/channelInfo.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";
import useChannelInfo from "./../useChannelInfo.ts";
import { delay } from "es-toolkit";
import { useLocation } from "react-router-dom";

/**
 * 模拟自动登录
 */
const mockAutoLogin = () => {
    return delay(1000);
};

const useGalaxyConfig = () => {
    const localStorage = useLocalStorage();
    void useLocation();
    const { setChannelInfo } = useChannelInfo<ChannelInfo>();
    const galaxyConfig: ChannelConfig = {
        sdk: [],
        loadSdkRouteFragment: ChannelInfoMap.GALAXY,
        //渠道名称
        channelName: ChannelInfoMap.GALAXY,
        preload(channelName, channelInfo, subChannelName) {
            return new Promise((resolve) => {
                console.log(channelName, channelInfo, resolve);
                console.log(localStorage);
                setChannelInfo({
                    channelName: channelName,
                    subChannelName: subChannelName
                });
                //模拟自动登录
                mockAutoLogin().then(() => {
                    //打开页面
                    resolve();
                });
            });
        }
    };
    return galaxyConfig;
};

export default useGalaxyConfig;
