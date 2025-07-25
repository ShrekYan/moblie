import type { HttpPluginOptions } from "awesome-utils-owner/http";
import loadingUtil from "./loadingUtil.tsx";

export const openLoading = ({ options }: Partial<HttpPluginOptions>) => {
    options = options || {};
    if (options.isLoading) {
        loadingUtil.showLoading();
    }
};

export const closeLoading = ({ options }: Partial<HttpPluginOptions>) => {
    //延迟300毫秒关闭loading,否则会出现一闪而过的效果体验性不是很友好。
    options = options || {};
    // const delayTime = 300;
    if (options.isLoading) {
        loadingUtil.removeLoading();
    }
};
