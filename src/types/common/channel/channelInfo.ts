export interface ChannelInfo {
    channelName: string; //主渠道名称
    subChannelName?: string; //子渠道名称
    [key: string]: any;
}

export interface ChannelConfig {
    sdk: string[];
    loadSdkRouteFragment: string;
    channelName: string;

    preload(
        channelName: string,
        channelInfo: ChannelInfo | null,
        subChannelName?: string
    ): Promise<void>;
}
