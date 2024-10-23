import type { HttpPluginOptions } from "./../http";
import { RESPONSE_CODE } from "./plugConfig";

export default ({ url, options, resp }: HttpPluginOptions) => {
    //默认开启返回原始数据
    const primitive = options && options.primitive;

    if (resp.data.code === RESPONSE_CODE.SUCCESS) {
        let resData = null;
        //返回原始数据
        if (primitive) {
            resData = resp.data;
        } else {
            resData = resp.data.data ? resp.data.data : {};
        }
        return resData;
    } else {
        //接口发生错误自动关闭loading
        if (options.errorExitAndCloseLoading) {
            //todo
            // Taro.hideLoading();
        }

        console.log(
            `%c接口出现异常:\ncode=${resp.data.code};\nurl=${url};\ndata=${JSON.stringify(resp.data)};`,
            "color:red;font-size:12px"
        );
        return Promise.reject(resp.data || {});
    }
};
