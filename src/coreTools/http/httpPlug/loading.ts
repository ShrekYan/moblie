import type { HttpPluginOptions } from "../http.ts";
import { Toast } from "antd-mobile";

export const openLoading = ({ options }: Partial<HttpPluginOptions>) => {
    options = options || {};
    if (options.isLoading) {
        Toast.show({
            icon: "loading",
            content: "加载中..."
        });
    }
};

export const closeLoading = ({ options }: Partial<HttpPluginOptions>) => {
    //延迟300毫秒关闭loading,否则会出现一闪而过的效果体验性不是很友好。
    options = options || {};
    // const delayTime = 300;
    if (options.isLoading) {
        Toast.clear();
    }
};
