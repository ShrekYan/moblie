import type { IOptions } from "awesome-utils-owner/http";
//import purBasic from "@Tool/pureBasic/index";
import { closeLoading } from "./loading.ts";

export interface IHttpPromiseStatusResponse<T> {
    isSuccess: boolean;
    data: T;
}

export interface IHttpPromiseAll {
    <IResponse>(
        promiseArray: {
            key: string;
            promiseFn: Promise<IResponse>;
        }[],
        options: IOptions | undefined
    ): Promise<IResponse>;
}

export interface IHttpPromiseAllForKey {
    <IResponse>(
        promiseArray: {
            key: string;
            promiseFn: Promise<IResponse>;
        }[],
        p?: { isLoading: boolean }
    ): Promise<IResponse>;
}

export interface IHttpPromiseStatusWrap {
    <IResponse>(promise: Promise<IResponse>): Promise<IHttpPromiseStatusResponse<IResponse>>;
}

/**
 * 针对封装后的http请求进行promise.all封装
 * @param promiseArray
 * @param options 仅支持loading
 * @return
 */
export const httpPromiseAll = function <IResponse>(
    promiseArray: Promise<IResponse>[] = [],
    options: IOptions | undefined = {}
): Promise<IResponse[]> {
    if (options.isLoading) {
        //todo
        // purBasic.func.delay(() => {
        //     openLoading({ options: options });
        // }, 0);
    }
    return new Promise<IResponse[]>((resolve, reject) => {
        return Promise.all(promiseArray)
            .then(function (resp: IResponse[]) {
                if (options.isLoading) {
                    closeLoading({ options });
                }
                resolve(resp);
            })
            .catch(function (error) {
                if (options.isLoading) {
                    closeLoading({ options });
                }
                reject(error);
            });
    });
};

/**
 * 针对封装后的http请求进行promise.all封装
 * @param promiseArray
 * @param options 仅支持loading
 * @returns {Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>}
 */
export const httpPromiseAllForKey = function <IResponse>(
    promiseArray: {
        key: string;
        promiseFn: Promise<IResponse>;
    }[],
    options: IOptions | undefined = {}
): Promise<IResponse> {
    if (options.isLoading) {
        //todo
        // purBasic.func.delay(() => {
        //     openLoading({ options });
        // }, 0);
    }
    return new Promise<IResponse>((resolve, reject) => {
        //获取promise数组
        const tempPromiseArray = promiseArray.map((item) => {
            return item.promiseFn;
        });
        return Promise.all(tempPromiseArray)
            .then(function (resp) {
                if (options.isLoading) {
                    closeLoading({ options });
                }
                const result: IResponse = {} as IResponse;
                resp.map((item, index) => {
                    // @ts-expect-error 过滤ts报错错误信息
                    result[promiseArray[index].key] = item;
                });
                resolve(result);
            })
            .catch(function (error) {
                if (options.isLoading) {
                    closeLoading({ options });
                }
                reject(error);
            });
    });
};

/**
 * 添加promise状态
 * @param promise
 * @returns {Promise<unknown>}
 */
export const httpPromiseStatusWrap = function <IResponse>(
    promise: Promise<IResponse>
): Promise<IHttpPromiseStatusResponse<IResponse>> {
    return new Promise((resolve) => {
        if (promise) {
            promise.then(
                function (data) {
                    resolve({
                        isSuccess: true,
                        data: data
                    });
                },
                function (data) {
                    resolve({
                        isSuccess: false,
                        data: data
                    });
                }
            );
        } else {
            resolve({
                isSuccess: false,
                data: {} as IResponse
            });
        }
    });
};
