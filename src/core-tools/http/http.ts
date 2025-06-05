import httpCore from "./httpCore.ts";
import type { PluginFunction } from "./httpFnStore.ts";
import httpFnStore from "./httpFnStore.ts";
import httpFlow from "./httpFlow";
import type { AxiosRequestConfig } from "axios";

/**
 * http options参数
 */
export interface IOptions {
    primitive?: boolean;
    urlPrefix?: string;
    isLoading?: boolean;
    openCustomError?: boolean;
    openExpire?: boolean;
    autoInteract?: boolean;
    customUrl?: boolean;
    useUserCacheInfo?: boolean;
    errorExitAndCloseLoading?: boolean;
    backupMockData?: boolean;
    firstMockData?: boolean;
    guid?: string;
}

/**
 * 接口返回参数
 */
export interface IResponseData<T> {
    code: string;
    data: T;
    msg: string;
    realMsg: string;
}

/**
 * 插件的PluginsOptions
 */
export interface HttpPluginOptions {
    url?: string;
    options: IOptions;
    resp: {
        data: IResponseData<object>;
    };
}

/**
 * 联合类型 options参数和undefined
 */
export type IOptionsAndUndefined = IOptions | undefined;

/**
 * http实现接口
 */
export interface IHttp {
    urlPrefix: string;
    addBeforeFn: (fn: PluginFunction) => void;
    addAfterFn: (fn: PluginFunction) => void;
    addErrorFn: (fn: PluginFunction) => void;
    addFinallyFn: (fn: PluginFunction) => void;
    getRequestUrl: (
        isCustomUrl: boolean | undefined,
        requestUrl: string,
        options: IOptions
    ) => string;
    mergeDefaultOptions: (options: IOptionsAndUndefined) => IOptions;

    compatibleOldInterface<KParams>(
        params: IOptionsAndUndefined | KParams,
        options: IOptionsAndUndefined
    ): IOptions;

    disposeProps<T>(props: T): T;

    post<KParams, TResponse>(
        requestUrl: string,
        params: KParams,
        options: IOptionsAndUndefined,
        headers?: AxiosRequestConfig
    ): Promise<IResponseData<TResponse>>;

    get<KParams, TResponse>(
        requestUrl: string,
        params: AxiosRequestConfig<KParams>,
        options: IOptionsAndUndefined
    ): Promise<IResponseData<TResponse>>;
}

/**
 * 获取服务前缀
 * @param optUrlPrefix
 * @param urlPrefix
 */
const getUrlPrefix = function (optUrlPrefix: string | undefined, urlPrefix: string) {
    return optUrlPrefix || urlPrefix;
};

class Http implements IHttp {
    urlPrefix: string;
    mockUrlPrefix: string;

    constructor(urlPrefix: string, mockUrlPrefix: string) {
        this.urlPrefix = urlPrefix;
        this.mockUrlPrefix = mockUrlPrefix;
    }

    /**
     * addBeforeFn
     * @param fn
     */
    addBeforeFn(fn: PluginFunction) {
        httpFnStore.addBeforeFn(fn);
    }

    /**
     * addAfterFn
     * @param fn
     */
    addAfterFn(fn: PluginFunction) {
        httpFnStore.addAfterFn(fn);
    }

    /**
     * addErrorFn
     * @param fn
     */
    addErrorFn(fn: PluginFunction) {
        httpFnStore.addErrorFn(fn);
    }

    /**
     * addFinallyFn
     * @param fn
     */
    addFinallyFn(fn: PluginFunction) {
        httpFnStore.addFinallyFn(fn);
    }

    /**
     * 处理空属性
     * @param prop
     * @returns {*}
     */
    disposeProps<T>(prop: T): T {
        if (prop === undefined || prop === null) {
            return {} as T; // 使用类型断言确保返回正确类型
        }
        return prop;
    }

    /**
     * 获取请求链接
     * @param isCustomUrl
     * @param requestUrl
     * @param options
     * @returns {*}
     */
    getRequestUrl(isCustomUrl: boolean | undefined, requestUrl: string, options: IOptions) {
        const urlPrefix = getUrlPrefix(options.urlPrefix, this.urlPrefix);
        // 自定义请求链接
        if (isCustomUrl) {
            return requestUrl;
        } else {
            return urlPrefix + requestUrl;
        }
    }

    /**
     * 合并默认options参数
     * @param options
     * @returns {*}
     */
    mergeDefaultOptions(options: IOptionsAndUndefined): IOptions {
        return Object.assign(
            {
                primitive: true,
                urlPrefix: this.urlPrefix || "",
                autoInteract: true,
                openCustomError: false,
                openExpire: true,
                isLoading: false,
                customUrl: false,
                useUserCacheInfo: true, // 使用用户缓存信息
                errorExitAndCloseLoading: true, // 接口报错自动关闭loading
                backupMockData: false
            },
            options || {} // 添加空对象处理undefined情况
        ) as IOptions; // 明确断言返回类型为IOptions
    }

    /**
     * 兼容老版本接口,params也可以定义http中options的配置
     * @param params
     * @param options
     */
    compatibleOldInterface<KParams>(
        params: IOptionsAndUndefined | KParams,
        options: IOptionsAndUndefined = {}
    ): IOptions {
        // 合并默认options参数
        const mergedOptions = this.mergeDefaultOptions(options);
        const safeParams = params || {};

        // 创建类型守卫检查对象是否为IOptions
        const isOptions = (obj: any): obj is IOptions => obj && typeof obj === "object";

        // 安全访问属性：使用可选链操作符和空值合并运算符
        const primitive = isOptions(safeParams) ? safeParams.primitive : undefined;
        const urlPrefix = isOptions(safeParams) ? safeParams.urlPrefix : undefined;
        const isLoading = isOptions(safeParams) ? safeParams.isLoading : undefined;
        const openCustomError = isOptions(safeParams) ? safeParams.openCustomError : undefined;
        const openExpire = isOptions(safeParams) ? safeParams.openExpire : undefined;
        const autoInteract = isOptions(safeParams) ? safeParams.autoInteract : undefined;
        const customUrl = isOptions(safeParams) ? safeParams.customUrl : undefined;
        const useUserCacheInfo = isOptions(safeParams) ? safeParams.useUserCacheInfo : undefined;
        const errorExitAndCloseLoading = isOptions(safeParams)
            ? safeParams.errorExitAndCloseLoading
            : undefined;
        const firstMockData = isOptions(safeParams) ? safeParams.firstMockData : undefined;
        const backupMockData = isOptions(safeParams) ? safeParams.backupMockData : undefined;

        // 构建兼容选项
        const compatibleOptions: IOptions = {
            primitive: primitive ?? mergedOptions.primitive,
            urlPrefix: urlPrefix ?? mergedOptions.urlPrefix,
            isLoading: isLoading ?? mergedOptions.isLoading,
            openCustomError: openCustomError ?? mergedOptions.openCustomError,
            openExpire: openExpire ?? mergedOptions.openExpire,
            autoInteract: autoInteract ?? mergedOptions.autoInteract,
            customUrl: customUrl ?? mergedOptions.customUrl,
            useUserCacheInfo: useUserCacheInfo ?? mergedOptions.useUserCacheInfo,
            errorExitAndCloseLoading:
                errorExitAndCloseLoading ?? mergedOptions.errorExitAndCloseLoading,
            backupMockData: backupMockData ?? mergedOptions.backupMockData,
            firstMockData: firstMockData ?? mergedOptions.firstMockData
        };

        // 判断是否未开发环境，如果不为开发环境则关闭备用服务（YAPI）
        // backupMockData、firstMockData仅用于开发环境上使用
        const devEnvCharacter = "dev";
        const notFundNumber = -1;
        if (compatibleOptions.backupMockData || compatibleOptions.firstMockData) {
            if (this.urlPrefix.toString().indexOf(devEnvCharacter) <= notFundNumber) {
                compatibleOptions.backupMockData = false;
                compatibleOptions.firstMockData = false;
            }
        }

        return compatibleOptions;
    }

    /**
     * 调用MOCK接口数据
     */
    callMockData<KParams, TResponse>(
        requestUrl: string,
        params: KParams,
        options: IOptionsAndUndefined = {},
        headers = {}
    ): Promise<IResponseData<TResponse>> {
        // 生成YAPI服务器接口链接
        const tempRequestUrl = this.getRequestUrl(
            true,
            this.mockUrlPrefix + requestUrl,
            this.mergeDefaultOptions(options) as IOptions
        );

        return httpFlow<KParams, IResponseData<TResponse>>(
            requestUrl,
            params,
            this.mergeDefaultOptions(options),
            () => {
                return httpCore.post(tempRequestUrl, params, headers);
            }
        ).then((data) => {
            console.group(
                `%c 备用数据源YAPI服务已成功启动！ \n 接口名称：${requestUrl} \n 服务地址：${tempRequestUrl}`,
                "color:red;font-size:12px"
            );
            console.log(`%c数据结果↓↓↓↓↓↓↓↓↓↓`, "color:red;font-size:14px");
            console.log("%o", data);
            console.groupEnd();
            return data;
        });
    }

    /**
     *
     * POST
     * @param requestUrl
     * @param params
     * @param options
     * @param headers
     *
     * options.isLoading 默认为false不开启loading加载效果
     *
     * options.primitive 默认为true 原始数据
     * 获取接口原数据，而不是被剥离的数据,原始数据为data.list，剥离数据为list,去除了上层结构
     *
     *
     * options.urlPrefix 默认使用http中默认设置的服务前缀
     * 单独接口重新设置服务请求前缀，如：https://mobile.qiangungun.com 变更为 https://mobilesit.qiangungun.com
     *
     * options.customUrl 默认为false
     * customUrl为true，默认使用用户自定义链接
     *
     * options.autoInteract 默认为true
     * 如果为true则提示错误信息，如果为false则不提示错误信息
     *
     * options.openCustomError 默认为false
     * 默认false不开启客户端自定义报错，如果为true则开启客户端自定义报错
     * 客户端自定义报错信息在config.js中的CUSTOM_ERRORS对象中定义
     *
     * options.openExpire 默认为true
     * 默认为true会自动开启处理session过期逻辑，为false则不开启处理session过期逻辑
     *
     * options.useUserCacheInfo 默认为true; true 接口请求添加用户缓存信息 false 接口请求不添加用户缓存信息
     *
     * options.errorExitAndCloseLoading 默认为true
     * errorExitAndCloseLoading 接口返回失败出现错误信息自动关闭loading效果
     *
     * options.backupMockData（仅用于开发环境） 默认为false，仅在开发阶段中使用
     * backupMockData为true时优先调用启动开发环境的接口（dev），如果开发环境（dev）接口不存在则会自动调用YAPI服务上的MOCK接口
     *
     * options.headers: 要添加在请求头上的参数
     *
     */
    post<KParams, TResponse>(
        requestUrl: string,
        params: KParams,
        options: IOptionsAndUndefined = {},
        headers?: AxiosRequestConfig
    ): Promise<IResponseData<TResponse>> {
        // 处理空属性并给予默认值
        const safeParams = this.disposeProps<KParams>(params);
        const safeOptions = this.disposeProps<IOptionsAndUndefined>(options);
        // 兼容老版本接口
        const mergedOptions = this.compatibleOldInterface<KParams>(safeParams, safeOptions);
        // request url
        const tempRequestUrl = this.getRequestUrl(
            mergedOptions.customUrl,
            requestUrl,
            mergedOptions
        );

        // 优先调用mock接口数据
        if (mergedOptions.firstMockData) {
            return this.callMockData<KParams, TResponse>(
                requestUrl,
                safeParams,
                safeOptions,
                headers
            );
        }

        // 备用mock数据逻辑，仅支持开发环境上使用
        if (mergedOptions.backupMockData) {
            return httpFlow<KParams, IResponseData<TResponse>>(
                requestUrl,
                safeParams,
                mergedOptions,
                () => {
                    return httpCore.post(tempRequestUrl, safeParams, headers);
                }
            ).then(
                (data) => {
                    return data;
                },
                (errorData) => {
                    const ajax404 = 404;
                    // 开发环境调用接口失败后自动调用YAPI服务MOCK接口数据
                    const zero = 0;
                    if (
                        errorData.status === ajax404 ||
                        Object.keys(errorData || {}).length === zero
                    ) {
                        return this.callMockData(requestUrl, safeParams, safeOptions, headers);
                    }
                    return Promise.reject(errorData);
                }
            );
        }
        return httpFlow<KParams, IResponseData<TResponse>>(
            requestUrl,
            safeParams,
            mergedOptions,
            () => {
                return httpCore.post(tempRequestUrl, safeParams, headers);
            }
        );
    }

    /**
     * Get请求
     * @param requestUrl
     * @param params
     * @param options
     */
    get<KParams, TResponse>(
        requestUrl: string,
        params: AxiosRequestConfig<KParams>,
        options: IOptionsAndUndefined = {}
    ): Promise<IResponseData<TResponse>> {
        // 处理空属性并给予默认值
        const safeParams = this.disposeProps<AxiosRequestConfig<KParams>>(params);
        const safeOptions = this.disposeProps<IOptionsAndUndefined>(options);
        // 兼容老版本接口
        const mergedOptions = this.compatibleOldInterface<KParams>(
            safeParams as IOptionsAndUndefined | KParams,
            safeOptions
        );
        const tempRequestUrl = this.getRequestUrl(
            mergedOptions.customUrl,
            requestUrl,
            mergedOptions
        );
        return httpCore
            .get<KParams, IResponseData<TResponse>>(tempRequestUrl, safeParams)
            .then((responseData) => {
                return responseData.data;
            });
    }
}

export default Http;
