import { httpPromiseAll, httpPromiseStatusWrap } from "./httpHelp.ts";
import { closeLoading, openLoading } from "./loading.ts";
import {
    httpEnhancer,
    parameter,
    response,
    responseError,
    session,
    networkError
} from "awesome-utils-owner/http";
import showErrorToastFn from "@core-tools/http/showErrorToast.ts";
// import { getServerUrl } from "@Src/config";

//根据不同的环境设置不同的服务器环境
const serverUrlPrefix = import.meta.env.VITE_BACK_END_SERVER;

const http = new httpEnhancer(serverUrlPrefix, "http://dev-yapi.gungunqian.cn:3000/mock/37");

const showErrorToast = showErrorToastFn();

http.addBeforePlug(
    parameter((data) => {
        data.version = "5.0.0";
        data.source = "H";
    })
)
    .addBeforePlug(openLoading)
    .addAfterPlug(response)
    .addAfterPlug(
        responseError((errorMsg) => {
            showErrorToast(errorMsg);
        })
    )
    .addAfterPlug(session(() => {}))
    .addErrorPlug(
        networkError(() => {
            showErrorToast("网络不好，请稍后重试");
        })
    )
    .addFinallyPlug(closeLoading);

export default http;

//promise.all处理
export const promiseAll = httpPromiseAll;

//promise.promiseStatusWrap 状态处理
export const promiseStatusWrap = httpPromiseStatusWrap;
