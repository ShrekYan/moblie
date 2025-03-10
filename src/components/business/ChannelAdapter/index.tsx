import React from "react";
import useChannelInfo from "@/business/channel/useChannelInfo.ts";
import { ChannelInfoMap } from "@/utils/constants/enum.channel.ts";

/**
 * 渠道适配组件
 * @param children
 * @param galaxyComponent
 * @constructor
 */
const ChannelAdapter: React.FC<
    React.PropsWithChildren<{
        galaxyComponent?: React.ReactNode;
    }>
> = ({ children, galaxyComponent }) => {
    const { getChannelName } = useChannelInfo();
    const channelName = getChannelName();

    if (channelName === ChannelInfoMap.GALAXY) {
        return galaxyComponent;
    }
    return children;
};

export default ChannelAdapter;
