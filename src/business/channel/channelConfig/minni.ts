import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import type { ChannelConfig, ChannelInfo } from "@/types/common/channel/channelInfo.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";
import useChannelInfo from "@/business/channel/useChannelInfo.ts";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useMinniConfig = () => {
    const localStorage = useLocalStorage();
    const location = useLocation();
    const { setChannelInfo } = useChannelInfo<ChannelInfo>();
    const galaxyConfig: ChannelConfig = {
        sdk: ["https://dev-galaxy.qiangungun.com/externalChannels/build/plugin/jweixin-1.0.0.js"],
        loadSdkRouteFragment: ChannelInfoMap.MINNI,
        //渠道名称
        channelName: ChannelInfoMap.MINNI,
        preload(channelName, channelInfo, subChannelName) {
            return new Promise((resolve) => {
                let userInfo: { userId: string; sessionId: string } | null = null;
                const params = queryString.parse(location.search, { decode: true });
                if (params?.userInfo) {
                    userInfo = JSON.parse(params.userInfo as string);
                }
                console.log(channelName, channelInfo, resolve, subChannelName);
                console.log(localStorage);
                console.log(userInfo);
                setChannelInfo({
                    channelName: channelName,
                    subChannelName: subChannelName
                });
                resolve();
            });
        }
    };
    return galaxyConfig;
};

export default useMinniConfig;
