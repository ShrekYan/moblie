import http from "@/core-tools/http";
import type { BossConfigurationListResponse } from "@/types/responses/config/qryBossConfiguration.ts";
import type { QryBossConfigurationRequest } from "@/types/requests/config/qryBossConfiguration.ts";

/**
 * 查询配置
 * @param params
 */
const qryBossConfiguration = (params: QryBossConfigurationRequest) => {
    return http.post<QryBossConfigurationRequest, BossConfigurationListResponse>(
        "/v1/plate/qryBossConfiguration",
        params,
        { isLoading: false }
    );
};

export default qryBossConfiguration;
