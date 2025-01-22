// import purBasic from "@Tool/pureBasic/index";
// import userMiddle from "../../../pureBusiness/part/userMiddle";
//import { PARAMS_CONFIG } from "./plugConfig";
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

export default ({ data }: { data: IData }) => {
    data.uuid = uuidV4();
    // //从缓存中获取用户信息
    // const user = userMiddle.getCacheUserInfo();
    // data.version = PARAMS_CONFIG.VERSION;
    // data.source = PARAMS_CONFIG.SOURCE;
    // data.guid = purBasic.guid.getGuid();
    // // data.busChannel = "mk";
    // // data.sysChannel = "MINI";
    // if (user && !data.noUserId) {
    //     data.userId = data.userId || user.userId;
    //     data.sessionId = data.sessionId || user.sessionId;
    // }
};
