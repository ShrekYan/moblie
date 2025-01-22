import httpEnhancer from "./httpEnhancer";
import parameter from "./httpPlug/parameter";
import { httpPromiseAll, httpPromiseStatusWrap } from "./httpHelp";
import { openLoading, closeLoading } from "./httpPlug/loading";
import response from "./httpPlug/response";
import responseError from "./httpPlug/responseError";
import session from "./httpPlug/session";
import networkError from "./httpPlug/networkError";
// import { getServerUrl } from "@Src/config";

//根据不同的环境设置不同的服务器环境
const serverUrlPrefix = import.meta.env.VITE_BACK_END_SERVER;

const http = new httpEnhancer(serverUrlPrefix, "http://dev-yapi.gungunqian.cn:3000/mock/37");

http.addBeforePlug(parameter)
    .addBeforePlug(openLoading)
    .addAfterPlug(response)
    .addAfterPlug(responseError)
    .addAfterPlug(session)
    .addErrorPlug(networkError)
    .addFinallyPlug(closeLoading);

export default http;

//promise.all处理
export const promiseAll = httpPromiseAll;

//promise.promiseStatusWrap 状态处理
export const promiseStatusWrap = httpPromiseStatusWrap;
