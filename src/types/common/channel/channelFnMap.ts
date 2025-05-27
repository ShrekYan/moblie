export interface ChannelFnMap {
    pageBack?: (callback?: () => void) => void;
    abc?: () => void;
    setTitle?: (title: string) => void;
    setShareInfo?: (shareInfo: { title: string; url?: string; imgUrl?: string }) => void;
}
