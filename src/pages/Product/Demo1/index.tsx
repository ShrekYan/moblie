import React from "react";
import useStore from "./useStore.ts";
import { useEffectOnce } from "react-use";
import { useObserver } from "mobx-react";
import PurchaseRateRow from "./components/PurchaseRateRow/index.tsx";
import type { QueryProductRateResponse } from "@/types/responses/product/queryProductRate.ts";
// import { Toast, Button } from "antd-mobile";
import { useParams, useSearchParams } from "react-router-dom";
// import queryString from 'query-string'
import classnames from "classnames";
import style from "./index.module.scss";

const Demo1: React.FC = () => {
    const store = useStore();
    const paramsResult = useParams();
    const [searchParams] = useSearchParams();

    useEffectOnce(() => {
        // /#/demo/622543?productId=622543
        const productId = paramsResult?.productId || searchParams.get("productId");
        store.queryProductRate({
            productId: productId || ""
        });
    });

    return useObserver(() => {
        const {
            purchaseRateList,
            subscribeRateList,
            //redeemRateList,
            trusteeRatio,
            manageRatio,
            saleServiceRate
        } = store;
        return (
            <div className={style.rateStructureContainer}>
                {/*销售服务费率*/}
                {saleServiceRate && (
                    <div className={style.saleServeRate}>
                        <div className={style.title}>销售服务费率</div>
                        <div className={style.desc}>本基金不收取认购/申购费用</div>
                        <div className={style.subDesc}>
                            <div className={style.leftArea}>销售服务费</div>
                            <div className={style.rightArea}>
                                按前一日基金资产净值的{saleServiceRate}%年费率计提。
                            </div>
                        </div>
                    </div>
                )}

                {/*基金申购费率*/}
                {!(saleServiceRate > 0) && (
                    <div className={classnames(style.fundOperationRate, style.tableBlock)}>
                        <div className={style.title}>基金申购费率</div>
                        <div className={style.table}>
                            <div className={style.tableHead}>
                                <div className={style.row}>
                                    <div className={style.item}>单笔金额（M）</div>
                                    <div className={style.item}>收费标准</div>
                                </div>
                            </div>
                            <div className={style.tableContent}>
                                {purchaseRateList.map(
                                    (
                                        item: QueryProductRateResponse["subscribeRateList"][0],
                                        index: number
                                    ) => {
                                        return <PurchaseRateRow item={item} key={index} />;
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/*基金运作费*/}
                <div className={style.fundOperationRate}>
                    <div className={style.title}>基金运作费</div>
                    <div className={style.descContainer}>
                        <div className={style.descItem}>
                            <div className={style.leftArea}>管理费率</div>
                            <div className={style.rightArea}>
                                本基金的管理费按前一日基金资产净值的{manageRatio}%年费率计提。
                            </div>
                        </div>
                        <div className={style.descItem}>
                            <div className={style.leftArea}>托管费率</div>
                            <div className={style.rightArea}>
                                按前一日基金资产净值的{trusteeRatio}%的年费率计提。
                            </div>
                        </div>
                    </div>
                </div>

                {/*基金认购费率*/}
                {subscribeRateList.length > 0 && (
                    <div className={classnames(style.fundOperationRate, style.tableBlock)}>
                        <div className={style.title}>基金认购费率</div>
                        <div className={style.table}>
                            <div className={style.tableHead}>
                                <div className={style.row}>
                                    <div className={style.item}>单笔金额（M）</div>
                                    <div className={style.item}>收费标准</div>
                                </div>
                            </div>
                            <div className={style.tableContent}>
                                {subscribeRateList.map(
                                    (
                                        item: QueryProductRateResponse["subscribeRateList"][0],
                                        index: number
                                    ) => {
                                        return <PurchaseRateRow item={item} key={index} />;
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    });
};

export default Demo1;
