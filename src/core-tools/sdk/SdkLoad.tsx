import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import PageLoading from "@/components/common/PageLoading/PageLoading.tsx";
import useChannelInfo from "@/business/channel/useChannelInfo.ts";
import useChannelMap from "@/business/channel/channelConfig/index.ts";
import { createScript } from "./handle.ts";
import type { ChannelInfo } from "@/types/common/channel/channelInfo.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";

/**
 * SDKLoad 加载
 * @param RouteList
 * @constructor
 */
const SDKLoad: React.FC<{ RouteList: React.ReactElement }> = ({ RouteList }) => {
    const [show, setShow] = useState(false);
    const { getChannelInfo } = useChannelInfo<ChannelInfo>();
    const channelConfig = useChannelMap();
    const location = useLocation();
    //主渠道和子渠道
    const { channel: queryChannel, subChannel: querySubChannel } = queryString.parse(
        location.search
    );
    //获取渠道信息
    useEffect(() => {
        //从缓存中获取渠道信息
        const channelInfo = getChannelInfo();
        //获取渠道执行方法的key
        const channelKey = channelInfo?.name || queryChannel || ChannelInfoMap.DEFAULT;
        //获取子渠道
        const subChannelKey = (querySubChannel as string) || "";
        if (channelKey) {
            //修正渠道key
            const fixChannelKey = channelConfig[channelKey] ? channelKey : ChannelInfoMap.DEFAULT;
            const skdList = channelConfig[fixChannelKey]?.sdk;
            //加载sdk
            createScript(skdList, 0, () => {
                //预先加载方法
                const preload = channelConfig[fixChannelKey].preload;
                preload(fixChannelKey, channelInfo, subChannelKey).then(() => {
                    setShow(true);
                });
            });
        } else {
            //开启页面
            setShow(true);
        }
    }, []);
    return show ? RouteList : <PageLoading />;
};
export default SDKLoad;
