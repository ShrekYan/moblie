import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import type { IResponseData } from "awesome-utils-owner/http";

export interface ChannelActionFnMap {
    queryProductRateTest?: (
        params: QueryProductRateRequest
    ) => Promise<IResponseData<QueryProductRateResponse>>;
}
