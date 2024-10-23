import { RESPONSE_CODE } from "./plugConfig";
// import userFull from "../../../pureBusiness/full/userFull";
// import jumpFull from "../../../pureBusiness/part/jumpMiddle";
import type { HttpPluginOptions } from "./../http";

export default ({ options, resp }: HttpPluginOptions) => {
    //session过期处理
    if (resp.data.code === RESPONSE_CODE.SESSION_TIMEOUT && options.openExpire) {
        // //用户登录
        // jumpFull.sessionIdOverdueJump({
        //     sessionIdOverdue: true
        // });
        // //清除用户缓存信息
        // userFull.removeCacheUserInfo();
    }
};
