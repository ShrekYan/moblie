import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { IResponseData } from "@/core-tools/http/http.ts";

//设置http网络请求超时时间
axios.defaults.timeout = 15000 * 2;

/**
 * 检查请求链接判断
 * @param requestUrl
 */
function checkRequestUrl(requestUrl: string): boolean | never {
    if (!requestUrl) {
        throw new Error("Please fill in the URL path!");
    }
    return true;
}

interface IHttpCore {
    get<KParams, TResponse>(
        requestUrl: string,
        paramsData: AxiosRequestConfig<KParams>
    ): Promise<IResponseData<TResponse>>;

    post<KParams, TResponse>(
        requestUrl: string,
        paramsData: KParams,
        headers: AxiosRequestConfig
    ): Promise<IResponseData<TResponse>>;
}

class HttpCore implements IHttpCore {
    /**
     * get请求
     * @param requestUrl
     * @param paramsData
     */
    get<KParams, TResponse>(
        requestUrl: string,
        paramsData: AxiosRequestConfig<KParams>
    ): Promise<IResponseData<TResponse>> {
        if (!checkRequestUrl(requestUrl)) {
            throw new Error("The requested link was not found!");
        }
        return axios.get<KParams, IResponseData<TResponse>>(requestUrl, paramsData);
    }

    /**
     * post请求
     * @param requestUrl
     * @param paramsData
     * @param headers
     */
    post<KParams, TResponse>(
        requestUrl: string,
        paramsData: KParams,
        headers?: AxiosRequestConfig
    ): Promise<IResponseData<TResponse>> {
        if (!checkRequestUrl(requestUrl)) {
            throw new Error("The requested link was not found!");
        }
        return axios.post<KParams, IResponseData<TResponse>>(requestUrl, paramsData, headers);
    }
}

export default new HttpCore();
