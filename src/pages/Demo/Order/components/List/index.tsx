import React from "react";
import { useNavigate } from "react-router-dom";
import { purchaseOrderFactory } from "@business/order/flow/index.ts";
import { useObserver } from "mobx-react";

const List: React.FC = () => {
    const navigate = useNavigate();

    return useObserver(() => {
        const purchaseOrder = purchaseOrderFactory.getCurrentInstance();
        const order = purchaseOrder?.getOrder();
        console.log(order?.amount);
        return (
            <div>
                <button
                    onClick={() => {
                        purchaseOrder?.changeAmount(8888);
                        navigate(-1);
                    }}
                >
                    点击返回
                </button>
            </div>
        );
    });
};

export default List;
