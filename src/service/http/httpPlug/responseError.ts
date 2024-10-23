import { RESPONSE_CODE, CUSTOM_ERRORS, NETWORK } from "./plugConfig";
// import showErrorToastFn from "./showErrorToast";

import type { HttpPluginOptions } from "../http";

type errorToastFnType = (errorMsg: string) => void;

//解决提示方法重复执行导致提示语闪屏现象
//todo
//showErrorToastFn
const showErrorToast: errorToastFnType = () => {};

export default ({ options, resp }: HttpPluginOptions) => {
    let autoInteract = true;
    //默认不开启客户端自定错误信息
    let openCustomError = false;

    if (options.openCustomError) {
        openCustomError = options.openCustomError;
    }

    if (options && options.autoInteract === false) {
        autoInteract = false;
    }

    if (autoInteract) {
        //错误码不为正确码或者 session超时的错误码都不进行报错
        if (
            RESPONSE_CODE.SUCCESS !== resp.data.code &&
            RESPONSE_CODE.SESSION_TIMEOUT !== resp.data.code
        ) {
            //默认为接口提供的服务信息
            let errorMsg = resp.data.msg || NETWORK.ERROR_MSG;

            //返回回来的错误码
            const respCode = resp.data.code;

            //开启客户端错误提示
            if (openCustomError) {
                //检查自定义错误信息
                if (Object.keys(CUSTOM_ERRORS).length > 0) {
                    //从自定义报错信息中获取信息并且提示
                    const _tempObj = CUSTOM_ERRORS[respCode];
                    if (_tempObj) {
                        errorMsg = _tempObj;
                    }
                }
            }

            //显示报错信息
            if (errorMsg && !options.backupMockData) {
                showErrorToast(errorMsg);
            }
        }
    }
};
