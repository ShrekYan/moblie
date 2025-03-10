import useChannelActionFnMap from "./useChannelActionFnMap.ts";
import useChannelInfo from "@/business/channel/useChannelInfo.ts";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import type { IResponseData } from "@/core-tools/http/http.ts";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";

export interface ChannelActionFnMap {
    queryProductRateTest?: (
        params: QueryProductRateRequest,
        callback: () => Promise<IResponseData<QueryProductRateResponse>>
    ) => Promise<IResponseData<QueryProductRateResponse>>;
}
/**
 * todo 目前仅发现更换接口（与之前的接口返回数据是一致的）、处理统一方法不同渠道的方法？
 */
const useChannelAction = (): ChannelActionFnMap => {
    const channelActionFnMap = useChannelActionFnMap();
    const { getChannelName } = useChannelInfo();
    return {
        queryProductRateTest(params, callback) {
            const channelName = getChannelName();
            const fnMap = channelActionFnMap[channelName];
            if (fnMap.queryProductRateTest) {
                return fnMap.queryProductRateTest(params);
            }
            return callback?.();
        }
    };
};

export default useChannelAction;
