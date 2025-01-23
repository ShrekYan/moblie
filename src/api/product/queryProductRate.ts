import http from "@/coreTools/http";
import { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";

/**
 * 查找产品费率
 * @param params
 */
const queryProductRate = (params: QueryProductRateRequest) => {
    return http.post<QueryProductRateRequest, QueryProductRateResponse>(
        "/v1/product/rate",
        params,
        { isLoading: true }
    );
};

export default queryProductRate;
