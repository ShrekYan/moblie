import type { ChannelActionFnMap } from "@/types/common/channel/channelActionFnMap.ts";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import useApi from "@/utils/http/useApi.ts";

const useGalaxyActionFnMap = (): ChannelActionFnMap => {
    const api = useApi();
    return {
        queryProductRateTest(params: QueryProductRateRequest) {
            return api.product.queryProductRate(params);
        }
    };
};

export default useGalaxyActionFnMap;
