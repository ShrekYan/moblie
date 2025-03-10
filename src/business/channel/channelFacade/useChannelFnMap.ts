import useDefaultFnMap from "./default/useDefaultFnMap.ts";
import useGalaxyFnMap from "./galaxy/useGalaxyFnMap.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";

type ChannelFnMap = {
    [key in string]: ReturnType<typeof useGalaxyFnMap> | ReturnType<typeof useDefaultFnMap>;
};

const useChannelFnMap = (): ChannelFnMap => {
    const defaultFnMap = useDefaultFnMap();
    const galaxyFnMap = useGalaxyFnMap();

    return {
        [ChannelInfoMap.GALAXY]: galaxyFnMap,
        [ChannelInfoMap.DEFAULT]: defaultFnMap
    };
};

export default useChannelFnMap;
