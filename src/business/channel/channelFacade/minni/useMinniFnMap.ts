import type { ChannelFnMap } from "@/types/common/channel/channelFnMap.ts";
import useUrl from "@utils/url/useUrl.ts";

const useMinniFnMap = (): ChannelFnMap => {
    const urlHook = useUrl();
    return {
        /**
         * 设置标题
         * @param title
         */
        setTitle(title) {
            document.title = title;
        },
        /**
         * 设置分享信息
         * @param shareInfo
         */
        setShareInfo(shareInfo) {
            let shareUrl = shareInfo.url ? shareInfo.url : window.location.href;
            const pathUrl = urlHook.filterQueryParamsByUrl(shareUrl);
            const queryParams = urlHook.getUrlParams(shareUrl);
            //过滤参数
            const filterQueryParams = urlHook.filterQueryPramsByProps(queryParams, [
                "userInfo",
                "userId",
                "sessionId",
                "channel",
                "vcOpen",
                "isLogout",
                "openH5BackBtn"
            ]);
            //过滤后生成的url链接
            shareUrl = urlHook.urlAddParams(pathUrl, filterQueryParams);
            console.info("========小程序配置分享参数======", {
                title: shareInfo.title,
                urlMark: window.location.href,
                sharePageUrl: decodeURI(shareUrl),
                shareImageUrl: shareInfo.imgUrl
            });
            //发送消息给微信小程序
            window.wx.miniProgram.postMessage({
                data: {
                    shareInfo: {
                        title: shareInfo.title,
                        urlMark: window.location.href,
                        sharePageUrl: encodeURIComponent(shareUrl),
                        shareImageUrl: shareInfo.imgUrl
                    }
                }
            });
        }
    };
};

export default useMinniFnMap;
