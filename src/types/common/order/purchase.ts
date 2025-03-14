export interface BaseOrder {
    productId?: string | null;
    amount?: number | null;
}

export interface DiscountInfo {
    discountCardList: any[];
    useDiscountStatus: null | "active" | "expired";
    selectDiscountCard: any | null;
    showDiscountCardInfo: any | null;
}

export type PurchaseBasicOrder = BaseOrder & DiscountInfo;

export type PurchaseOrder = PurchaseBasicOrder;
