import Order from "./Order.ts";
import { extendObservable } from "mobx";
import type { PurchaseBasicOrder } from "@/types/common/order/purchase.ts";

class PurchaseBasic<T extends PurchaseBasicOrder> extends Order<T> {
    constructor(order?: T) {
        super(order);
        // 扩展observable对象
        extendObservable(Object.assign(this.order, order), {
            discountCardList: [],
            useDiscountStatus: null,
            selectDiscountCard: null,
            showDiscountCardInfo: null
        });
    }
}

export default PurchaseBasic;
