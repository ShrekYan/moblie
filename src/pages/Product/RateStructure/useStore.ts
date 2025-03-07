import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
import { withPersist } from "@/utils/storage/usePersistedStore.ts";
import { encryptByAES, decryptByAES } from "@/utils/encrypt/useEncrypt.ts";

import api from "@/api/index.tsx";

export interface MobxStoreType {
    queryProductRate: (requestData: QueryProductRateRequest) => QueryProductRateResponse;
    productRate: QueryProductRateResponse["productRate"];
    purchaseRateList: QueryProductRateResponse["purchaseRateList"];
    subscribeRateList: QueryProductRateResponse["subscribeRateList"];
    redeemRateList: QueryProductRateResponse["redeemRateList"];
    trusteeRatio: QueryProductRateResponse["trusteeRatio"];
    manageRatio: QueryProductRateResponse["manageRatio"];
    saleServiceRate: QueryProductRateResponse["saleServiceRate"];
}

type UseMobxStoreType = () => MobxStoreType;

/**
 * use mobxStore
 */
const useMobxStore: UseMobxStoreType = () => {
    const store = useLocalObservable<MobxStoreType>(() => ({
        productRate: {},
        purchaseRateList: [],
        subscribeRateList: [],
        redeemRateList: [],
        trusteeRatio: null,
        manageRatio: null,
        saleServiceRate: null,
        /**
         * 产品产品费率
         * @param productId
         */
        async queryProductRate({ productId }) {
            try {
                const response = await api.product.queryProductRate({ productId });
                const placeholder = "--";
                const saleServiceRate = response.data.saleServiceRate;
                runInAction(() => {
                    store.productRate = response.data;
                    store.purchaseRateList = response.data.purchaseRateList;
                    store.subscribeRateList = response.data.subscribeRateList;
                    store.redeemRateList = response.data.redeemRateList;
                    store.trusteeRatio = response.data.trusteeRatio;
                    store.manageRatio = response.data.manageRatio;
                    store.saleServiceRate =
                        saleServiceRate && saleServiceRate !== placeholder ? saleServiceRate : null;
                });
            } catch (e) {
                console.log(e);
            }
        }
    }));

    //仅持久化指定字段
    //usePersistedStore(store, "productRateStore");
    return store;
};

export default withPersist(useMobxStore, {
    key: "product_rate_store",
    //序列化
    serialize: (data) => {
        return encryptByAES(JSON.stringify(data));
    },
    //反序列化
    deserialize: (str) => {
        return JSON.parse(decryptByAES(str));
    }
});
