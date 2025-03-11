import type { ChannelFnMap } from "@/types/common/channel/channelFnMap.ts";

const useGalaxyFnMap = (): ChannelFnMap => {
    return {
        pageBack() {
            console.log("Galaxy page back");
        },
        abc() {
            console.log("Galaxy ABC");
        }
    };
};

export default useGalaxyFnMap;
