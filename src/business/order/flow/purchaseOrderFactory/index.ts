import Purchase from "./Purchase.ts";

class PurchaseOrderFactory {
    private currentInstance: Purchase | null = null;

    initInstance() {
        const purchaseOrder = new Purchase();
        this.currentInstance = purchaseOrder;
        return purchaseOrder;
    }

    getCurrentInstance(): Purchase | null {
        if (this?.currentInstance) {
            return this.currentInstance;
        } else {
            history.back();
            return null;
        }
    }
}

export default PurchaseOrderFactory;

//export default usePurchaseOrderFactory;
