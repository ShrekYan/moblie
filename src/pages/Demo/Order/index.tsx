import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import { useNavigate, useLocation } from "react-router-dom";
import { purchaseOrderFactory } from "@business/order/flow/index.ts";
import { useActivate, useAliveController, useUnactivate } from "react-activation";
import Purchase from "@business/order/flow/purchaseOrderFactory/Purchase.ts";
import type { RouteConfig } from "@/routes";
import { delay } from "es-toolkit";

const Order: React.FC<{
    routeItemConfig: RouteConfig;
}> = ({ routeItemConfig }) => {
    const [purchaseOrder, setPurchaseOrder] = useState<Purchase>();
    const navigate = useNavigate();
    const location = useLocation();
    const { drop } = useAliveController();
    console.log(routeItemConfig);

    useActivate(() => {});

    useUnactivate(() => {
        console.log(location);
        //清除页面缓存
        if (window.location.href.indexOf("order") === -1) {
            delay(0).then(() => {
                drop("/demo/order");
            });
        }
    });
    useEffect(() => {
        const purchaseOrder = purchaseOrderFactory.initInstance();
        setPurchaseOrder(purchaseOrder);
    }, []);

    return useObserver(() => {
        const order = purchaseOrder?.order;
        return (
            <div>
                <div
                    onClick={() => {
                        navigate("/demo/order/list");
                    }}
                >
                    跳转到银行卡
                </div>
                <input
                    value={order?.amount || ""}
                    onChange={(e) => {
                        purchaseOrder?.changeAmount(e.target.value ? Number(e.target.value) : null);
                    }}
                />
                <div>
                    cacheInput:
                    <input />
                </div>
            </div>
        );
    });
};

export default Order;
