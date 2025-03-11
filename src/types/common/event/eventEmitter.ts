import type { BossConfigurationItem } from "@/types/responses/config/qryBossConfiguration.ts";

type EventMap = Record<string, any[]>;

export interface EventEmitter extends EventMap {
    bigScreenAdList: [BossConfigurationItem];
    buoyList: [BossConfigurationItem];
}
