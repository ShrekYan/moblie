import useChannelFnMap from "./useChannelFnMap";
import useChannelInfo from "./../useChannelInfo.ts";

const useChannelFacade = () => {
    const channelFnMap = useChannelFnMap();
    const { getChannelName } = useChannelInfo();

    return {
        /**
         * 页面返回
         * @param callback
         */
        pageBack(callback: () => void) {
            const channelName = getChannelName();
            const fnMap = channelFnMap[channelName];
            if (fnMap.pageBack) {
                fnMap.pageBack();
            } else {
                callback?.();
            }
        }
    };
};

export default useChannelFacade;
