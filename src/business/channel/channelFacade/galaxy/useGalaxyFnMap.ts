import type { ChannelFnMap } from "@/types/common/channelFnMap.ts";

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
