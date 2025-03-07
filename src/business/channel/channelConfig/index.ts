import useGalaxyConfig from "./galaxy.ts";
import useDefaultConfig from "./default.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";
import type { ChannelConfig } from "@/types/common/channelInfo.ts";

const useChannelMap = (): Record<string, ChannelConfig> => {
    const galaxyConfig = useGalaxyConfig();
    const defaultConfig = useDefaultConfig();
    return {
        [ChannelInfoMap.GALAXY]: galaxyConfig,
        [ChannelInfoMap.DEFAULT]: defaultConfig
    };
};

export default useChannelMap;
