import { useLocalObservable } from "mobx-react";
import type { QueryProductRateRequest } from "@/types/requests/product/queryProductRate.ts";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
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
                store.productRate = response.data;
                store.purchaseRateList = response.data.purchaseRateList;
                store.subscribeRateList = response.data.subscribeRateList;
                store.redeemRateList = response.data.redeemRateList;
                store.trusteeRatio = response.data.trusteeRatio;
                store.manageRatio = response.data.manageRatio;
                store.saleServiceRate =
                    saleServiceRate && saleServiceRate !== placeholder ? saleServiceRate : null;
            } catch (e) {
                console.log(e);
            }
        }
    }));
    return store;
};

export default useMobxStore;
