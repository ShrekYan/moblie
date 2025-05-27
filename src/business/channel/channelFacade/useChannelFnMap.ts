import useDefaultFnMap from "./default/useDefaultFnMap.ts";
import useGalaxyFnMap from "./galaxy/useGalaxyFnMap.ts";
import useMinniFnMap from "./minni/useMinniFnMap.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";

type ChannelFnMap = {
    [key in string]:
        | ReturnType<typeof useGalaxyFnMap>
        | ReturnType<typeof useDefaultFnMap>
        | ReturnType<typeof useMinniFnMap>;
};

const useChannelFnMap = (): ChannelFnMap => {
    const defaultFnMap = useDefaultFnMap();
    const galaxyFnMap = useGalaxyFnMap();
    const minniFnMap = useMinniFnMap();

    return {
        [ChannelInfoMap.GALAXY]: galaxyFnMap,
        [ChannelInfoMap.DEFAULT]: defaultFnMap,
        [ChannelInfoMap.MINNI]: minniFnMap
    };
};

export default useChannelFnMap;
