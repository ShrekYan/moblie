import useDefaultActionFnMap from "./default/useDefaultActionFnMap.ts";
import useGalaxyActionFnMap from "./galaxy/useGalaxyActionFnMap.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";

type ChannelFnMap = {
    [key in string]:
        | ReturnType<typeof useDefaultActionFnMap>
        | ReturnType<typeof useGalaxyActionFnMap>;
};
const useChannelActionFnMap = (): ChannelFnMap => {
    const defaultActionFnMap = useDefaultActionFnMap();
    const galaxyActionFnMap = useGalaxyActionFnMap();

    return {
        [ChannelInfoMap.DEFAULT]: defaultActionFnMap,
        [ChannelInfoMap.GALAXY]: galaxyActionFnMap
    };
};

export default useChannelActionFnMap;
