import createJsBridge from "./createJsBridge.ts";

const callNativeFlag = "jsTransferAppCallBack";
const registerHandlerFlag = "appTransferJsData";

/**
 * 主动调用app方法
 * callHandler<{ pageName: string, productId: string }, { productId: string }>({
 *     pageName: "DetailViewController",
 *     productId: "600001"
 * }, (data) => {
 *     console.log(data.productId);
 * });
 * @param callback
 * @param params
 */
export const callHandler = <T = any, R = any>(params: T, callback?: (response: R) => void) => {
    createJsBridge((bridge) => {
        bridge.callHandler(callNativeFlag, params, (response: R) => {
            callback?.(response);
        });
    });
};

/**
 * app主动调用h5方法
 * @param callback
 * @param responseData
 */
export const registerHandler = <T = any, R = any>(
    callback: (response: R) => any,
    responseData?: T
) => {
    createJsBridge((bridge) => {
        bridge.registerHandler(
            registerHandlerFlag,
            (data: R, responseCallback: (responseData: T) => void) => {
                const result = responseData || callback?.(data);
                responseCallback?.(result);
            }
        );
    });
};
