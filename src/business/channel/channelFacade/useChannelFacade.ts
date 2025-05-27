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
        pageBack(callback?: () => void) {
            const channelName = getChannelName();
            const fnMap = channelFnMap[channelName];
            if (fnMap?.pageBack) {
                fnMap.pageBack();
            } else {
                callback?.();
            }
        },
        /**
         * 设置标题
         * @param title
         */
        setTitle(title: string) {
            const channelName = getChannelName();
            const fnMap = channelFnMap[channelName];
            if (fnMap?.setTitle) {
                fnMap.setTitle(title);
            }
        },
        /**
         * 设置分享信息
         * @param shareInfo
         */
        setShareInfo(shareInfo: { title: string; url?: string; imgUrl?: string }) {
            const channelName = getChannelName();
            const fnMap = channelFnMap[channelName];
            if (fnMap?.setShareInfo) {
                fnMap.setShareInfo(shareInfo);
            }
        }
    };
};

export default useChannelFacade;
