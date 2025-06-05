import type { IOptions } from "./http.ts";
import httpFnStore from "./httpFnStore.ts";
import type { PluginFunction } from "./httpFnStore.ts";

/**
 * http执行前发送的方法
 * @param url
 * @param data
 * @param options
 * @param beforeFnList
 */
function beforeMethod<KParams, TResponse>(
    url: string,
    data: KParams,
    options: IOptions,
    beforeFnList: PluginFunction[]
): Promise<TResponse | boolean> {
    return new Promise((resolve) => {
        beforeFnList.map((fn: PluginFunction) => {
            fn({ url, data, options });
        });
        resolve(true);
    });
}

/**
 * http执行完成后发送的方法
 * @param url
 * @param data
 * @param options
 * @param resp
 * @param finallyFnList
 */
function finallyMethod<KParams, TResponse>(
    url: string,
    data: KParams,
    options: IOptions,
    resp: TResponse,
    finallyFnList: PluginFunction[]
): void {
    finallyFnList.map((fn) => {
        fn({ url, data, options, resp });
    });
}

/**
 * http执行流程
 * @param url
 * @param data
 * @param options
 * @param httpFn
 */
function httpFlow<KParams, TResponse>(
    url: string,
    data: KParams,
    options: IOptions,
    httpFn: PluginFunction
): Promise<TResponse> {
    const beforeFnList = httpFnStore.getBeforeFn();
    const afterFnList = httpFnStore.getAfterFn();
    const finallyFnList = httpFnStore.getFinallyFn();
    const errorFnList = httpFnStore.getErrorFn();
    return beforeMethod<KParams, TResponse>(url, data, options, beforeFnList).then(function () {
        let promise = httpFn(url, data, options);
        promise = promise.then(
            (resp: TResponse) => {
                let newResp = resp;
                //http返回结果后执行的方法
                afterFnList.map((fn) => {
                    const _tempResp = fn({
                        url,
                        data,
                        options,
                        resp
                    });
                    if (_tempResp) {
                        newResp = _tempResp;
                    }
                });
                finallyMethod(url, data, options, resp, finallyFnList);
                return newResp;
            },
            function (resp: TResponse) {
                errorFnList.map((fn) => {
                    fn({ url, data, options, resp });
                });
                finallyMethod(url, data, options, resp, finallyFnList);
                return Promise.reject(resp);
            }
        );
        return promise;
    });
}

export default httpFlow;
