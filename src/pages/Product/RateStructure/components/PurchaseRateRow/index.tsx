import React from "react";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
import { FeeTypeEm } from "./../../constant.ts";

const numberHandle = function (value: number) {
    return value / 10000;
};

const PurchaseRateRow: React.FC<{
    item: QueryProductRateResponse["subscribeRateList"][0];
}> = (props) => {
    const rateItemInfo = props.item;
    return (
        <div className="row">
            <div className="item">
                {rateItemInfo.to ? (
                    <div>
                        {rateItemInfo.from ? (
                            <span>{numberHandle(rateItemInfo.from)}万≤</span>
                        ) : null}
                        <span>M</span>
                        <span>&lt;{numberHandle(rateItemInfo.to)}万</span>
                    </div>
                ) : (
                    <div>
                        <span>M≥</span>
                        {rateItemInfo.from ? (
                            <span>{numberHandle(rateItemInfo.from)}万</span>
                        ) : (
                            <span>0</span>
                        )}
                    </div>
                )}
            </div>
            <div className="item">
                {rateItemInfo.feeType === FeeTypeEm.percent && <span>{rateItemInfo.fee}%</span>}
                {rateItemInfo.feeType === FeeTypeEm.each && <span>单笔{rateItemInfo.fee}</span>}
            </div>
        </div>
    );
};

export default PurchaseRateRow;
