import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import type { ChannelConfig, ChannelInfo } from "@/types/common/channelInfo.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";
import useChannelInfo from "@/business/channel/useChannelInfo.ts";

const useDefaultConfig = () => {
    const localStorage = useLocalStorage();
    const { setChannelInfo } = useChannelInfo<ChannelInfo>();
    const galaxyConfig: ChannelConfig = {
        sdk: ["https://static.qiangungun.com/sarli/jssdk/minProgram/jweixin-1.2.0.js"],
        loadSdkRouteFragment: ChannelInfoMap.DEFAULT,
        //渠道名称
        channelName: ChannelInfoMap.DEFAULT,
        preload(channelName, channelInfo, subChannelName) {
            return new Promise((resolve) => {
                console.log(channelName, channelInfo, resolve, subChannelName);
                console.log(localStorage);
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

export default useDefaultConfig;
