import { observable, reaction, makeObservable } from "mobx";
import { cloneDeep } from "es-toolkit";
import { localStorage } from "@utils/storage/useLocalStorage.ts";

class Order<T extends object> {
    //order
    order: T;
    //原始的order
    originalOrder: T;
    cacheFlag = "orderInfo";

    constructor(order: T = {} as T) {
        // 初始化原始订单副本
        this.originalOrder = cloneDeep(order);

        const observableOrder = observable.object(cloneDeep(order), {}, { deep: true }) as T;

        // 创建深度的可观察对象
        this.order = observableOrder;

        const saveData = localStorage.getItem<T>(this.cacheFlag);

        if (saveData) {
            (Object.keys(saveData) as Array<keyof T>).forEach((key) => {
                if (key in this.order) {
                    this.order[key] = saveData[key];
                }
            });
        }

        //监听并保存
        reaction(
            () => {
                return Object.entries(observableOrder).map(([, value]) => {
                    return value;
                });
            },
            () => {
                const persistData = Object.entries(observableOrder).reduce((acc, [key]) => {
                    const validKey = key as keyof T;
                    acc[validKey] = this.order[validKey];
                    return acc;
                }, {} as T);
                localStorage.setItem(this.cacheFlag, persistData);
            },
            { delay: 300, fireImmediately: true }
        );

        makeObservable(this, {
            order: observable.ref
        });
    }

    /**
     * 获取原始定义的订单
     */
    getOriginalOrder(): T {
        return this.originalOrder;
    }

    /**
     * 获取订单
     */
    getOrder(): T {
        return this.order || {};
    }

    /**
     * 重置订单
     */
    resetOrder(): T {
        this.order = this.updateOrder(this.originalOrder);
        return this.order;
    }

    /**
     * 修改订单
     * @param order
     */
    updateOrder(order: T): T {
        this.order = observable.object(cloneDeep(order), {}, { deep: true }) as T;
        localStorage.setItem(this.cacheFlag, this.order);
        return this.order;
    }

    /**
     * 删除订单
     */
    deleteOrder() {
        this.order = {} as T;
        localStorage.removeItem(this.cacheFlag);
    }
}

export default Order;
