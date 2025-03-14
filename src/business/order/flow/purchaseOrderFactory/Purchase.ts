import { action } from "mobx";
import PurchaseBasic from "./PurchaseBasic.ts";
import type { PurchaseOrder } from "@/types/common/order/purchase.ts";

class Purchase extends PurchaseBasic<PurchaseOrder> {
    constructor() {
        super({
            amount: null,
            productId: null
        } as PurchaseOrder);
    }

    changeAmount = action((amount: number | null) => {
        this.order.amount = amount;
    });
}

export default Purchase;
