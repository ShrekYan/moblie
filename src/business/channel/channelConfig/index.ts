import useGalaxyConfig from "./galaxy.ts";
import useDefaultConfig from "./default.ts";
import userMinniConfig from "./minni.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";
import type { ChannelConfig } from "@/types/common/channel/channelInfo.ts";

const useChannelMap = (): Record<string, ChannelConfig> => {
    const galaxyConfig = useGalaxyConfig();
    const defaultConfig = useDefaultConfig();
    const minniConfig = userMinniConfig();
    return {
        [ChannelInfoMap.GALAXY]: galaxyConfig,
        [ChannelInfoMap.DEFAULT]: defaultConfig,
        [ChannelInfoMap.MINNI]: minniConfig
    };
};

export default useChannelMap;
