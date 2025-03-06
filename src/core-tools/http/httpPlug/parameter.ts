// import purBasic from "@Tool/pureBasic/index";
// import userMiddle from "../../../pureBusiness/part/userMiddle";
import { PARAMS_CONFIG } from "./constant.ts";
import { v4 as uuidV4 } from "uuid";

interface IData {
    version: string;
    source: string;
    uuid: string;
    userId: string;
    sessionId: string;
    busChannel: string;
    sysChannel: string;
    noUserId: boolean;
    //[props: string]: any;
}

/**
 * todo 附带userInfo信息
 * @param data
 */
export default ({ data }: { data: IData }) => {
    data.uuid = uuidV4().replace(/-/g, "");
    data.version = PARAMS_CONFIG.VERSION;
    data.source = PARAMS_CONFIG.SOURCE;
    // //从缓存中获取用户信息
    // const user = userMiddle.getCacheUserInfo();
    //
    //
    // data.guid = purBasic.guid.getGuid();
    // // data.busChannel = "mk";
    // // data.sysChannel = "MINI";
    // if (user && !data.noUserId) {
    //     data.userId = data.userId || user.userId;
    //     data.sessionId = data.sessionId || user.sessionId;
    // }
};
