const useUrl = () => {
    /**
     * 获取单个query string
     * @param strArray
     */
    const getStringData = (strArray: string[]): string[] => {
        return strArray.reduce<string[]>((acc, str) => {
            if (str.includes("?")) acc.push(str.split("?")[1]);
            return acc;
        }, []);
    };

    /**
     * 获取url链接上的queryString 对象
     * @param url
     */
    const getUrlParams = (url: string = window.location.href): Record<string, string> => {
        const request: { [key: string]: string } = {};
        const index = url.indexOf("?");

        if (index > -1) {
            const tempStr = url.substr(index + 1);
            const strArray = tempStr.split("&");

            strArray.concat(getStringData(strArray)).forEach((item) => {
                const tempItem = item.split("?")[0]; // 处理双问号
                const [key, value] = tempItem.split("=");

                if (key && value) {
                    request[key] = window.decodeURIComponent(value);
                }
            });
        }

        return request;
    };

    /**
     * 获取？之前的链接地址
     * @param url
     */
    const filterQueryParamsByUrl = (url: string) => {
        if (!url) {
            return "";
        }
        let originUrl = url;
        const negativeOne = -1;
        const findIndex = url.lastIndexOf("?");
        if (findIndex > negativeOne) {
            originUrl = originUrl.substring(0, findIndex);
        }
        return originUrl;
    };

    /**
     * 过滤参数
     * @param object
     * @param props
     */
    const filterQueryPramsByProps = (object: Record<string, any>, props: string[] = []) => {
        const newPrams: Record<string, any> = {};
        for (const key in object) {
            if (!props.includes(key)) {
                newPrams[key] = object[key];
            }
        }
        return newPrams;
    };

    /**
     * params to queryString
     * @param data
     * @return string
     */
    const paramsToQueryString = (data: Record<string, any>) => {
        if (!data || Object.keys(data).length == 0) {
            return null;
        }
        let queryString = "";
        for (const item in data) {
            if (data[item]) {
                queryString += `${item}=${data[item]}&`;
            }
        }
        //去除多余的&
        if (queryString.length > 0) {
            queryString = queryString.substr(0, queryString.length - 1);
        }
        return queryString;
    };

    /**
     * url 链接添加参数
     * @param url
     * @param params
     */
    const urlAddParams = (url: string, params: Record<string, any>) => {
        if (!url) {
            return url;
        }
        const hasIndex = url.indexOf("#");
        const hasHash = hasIndex > -1;
        let hasParams = null;
        const paramsMark = "?";
        const queryString = paramsToQueryString(params);
        let tempUrl = url;
        //hash处理
        if (hasHash) {
            const hashStr = tempUrl.substr(hasIndex);
            const hashHasParams = hashStr.indexOf(paramsMark) > -1;
            if (queryString) {
                if (hashHasParams) {
                    tempUrl = `${url}&${queryString}`;
                } else {
                    tempUrl = `${url}?${queryString}`;
                }
            }
        }

        //非hash处理
        if (!hasHash) {
            hasParams = tempUrl.indexOf(paramsMark) > -1;
            if (queryString) {
                if (hasParams) {
                    tempUrl = `${url}&${queryString}`;
                } else {
                    tempUrl = `${url}?${queryString}`;
                }
            }
        }
        return tempUrl;
    };

    return {
        getUrlParams,
        filterQueryParamsByUrl,
        filterQueryPramsByProps,
        urlAddParams
    };
};

export default useUrl;
