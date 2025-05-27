import React, { useEffect } from "react";
import useChannelFacade from "@business/channel/channelFacade/useChannelFacade.ts";

const PageHead: React.FC<{ title: string }> = ({ title }) => {
    const channel = useChannelFacade();
    useEffect(() => {
        channel.setTitle(title);
    }, []);
    return null;
};

export default PageHead;
