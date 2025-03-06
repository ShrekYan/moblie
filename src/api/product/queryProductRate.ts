import http from "@/core-tools/http";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";

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
