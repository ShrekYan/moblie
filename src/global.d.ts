declare interface Window {
    WebViewJavascriptBridge: any;
    WVJBCallbacks: any;
    wx: any;
}

declare module "pdfh5" {
    export default any;
}

// globals.d.ts
interface NetworkInformation {
    readonly type?:
        | "bluetooth"
        | "cellular"
        | "ethernet"
        | "wifi"
        | "wimax"
        | "other"
        | "unknown"
        | "none";
    readonly effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
    readonly downlink?: number;
    readonly rtt?: number;
    readonly saveData?: boolean;
    onchange: EventListener | null;
    addEventListener(
        type: string,
        listener: EventListener | EventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener(
        type: string,
        listener: EventListener | EventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;
}

interface Navigator {
    readonly connection?: NetworkInformation;
    readonly deviceMemory?: number;
}
