import { useEffect } from "react";
import { reaction, toJS, runInAction } from "mobx";
import useLocalStorage from "@/helpers/useLocalStorage.ts";

// 转换为普通对象后判断
const isEmpty = (obj: any) => {
    const plainObj = toJS(obj || {});
    return Object.keys(plainObj)?.length === 0;
};

/**
 * usePersistedStore
 * @param store
 * @param persistKey
 * @param properties
 */
export const usePersistedStore = <T extends object>(
    store: T,
    persistKey: string,
    properties?: Array<keyof T>
) => {
    const localStorage = useLocalStorage();
    //初始化加载数据
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saveData = localStorage.getItem<T>(persistKey);
        //过滤function
        const keysToWatch =
            properties ||
            (Object.keys(store) as Array<keyof T>).filter((key): key is keyof T => {
                return key in store && typeof store[key] !== "function";
            });
        if (saveData) {
            keysToWatch.forEach((key) => {
                //store值为空的情况，才进行改变store
                if (isEmpty(store[key])) {
                    runInAction(() => {
                        store[key] = saveData[key];
                    });
                }
            });
        }
    }, [store, persistKey, properties, localStorage]);

    //监听
    useEffect(() => {
        const keysToWatch =
            properties ||
            (Object.keys(store) as Array<keyof T>).filter((key): key is keyof T => {
                return key in store && typeof store[key] !== "function";
            });
        const disposer = reaction(
            () => {
                return keysToWatch.map((key) => {
                    return store[key];
                });
            },
            () => {
                const persistData = keysToWatch.reduce((acc, key) => {
                    if (!isEmpty(store[key])) {
                        acc[key] = toJS(store[key]);
                    }
                    return acc;
                }, {} as any);
                localStorage.setItem(persistKey, persistData);
            },
            { delay: 300, fireImmediately: true }
        );
        return () => {
            disposer();
        };
    }, [store, persistKey, properties]);
};

export default usePersistedStore;

type PersistConfig<T> = {
    /**存储键名 */
    key: string;
    /**要持久化的属性列表 */
    include?: Array<keyof T>;
    /**自定义序列化方法 */
    serialize?: (data: Partial<T>) => string;
    /**自定义反序列化方法 */
    deserialize?: (saved: string) => Partial<T>;
    /**防抖时间（ms） */
    debounce?: number;
};

/**
 * withPersist
 * @param storeCreator
 * @param config
 */
export function withPersist<T extends object>(storeCreator: () => T, config: PersistConfig<T>) {
    return () => {
        const store = storeCreator();
        const localStorage = useLocalStorage();

        useEffect(() => {
            // 初始化加载
            if (typeof window === "undefined") return;
            const saveData = localStorage.getItem(config.key);
            if (saveData) {
                const data = config.deserialize ? config.deserialize(saveData as string) : saveData;
                //过滤function
                const keysToWatch =
                    config.include ||
                    (Object.keys(store) as Array<keyof T>).filter((key): key is keyof T => {
                        return key in store && typeof store[key] !== "function";
                    });
                Object.entries(data).forEach(([key, value]) => {
                    const validKey = key as keyof T;
                    if (
                        //store值为空的情况，才进行改变store
                        keysToWatch.includes(validKey) &&
                        typeof value === typeof store[validKey] &&
                        isEmpty(store[validKey])
                    ) {
                        runInAction(() => {
                            store[validKey] = value as (typeof store)[typeof validKey];
                        });
                    }
                });
            }
        }, []);

        useEffect(() => {
            //过滤function的key
            const keysToWatch =
                config.include ||
                (Object.keys(store) as Array<keyof T>).filter((key): key is keyof T => {
                    return key in store && typeof store[key] !== "function";
                });
            const disposer = reaction(
                () => {
                    keysToWatch.map((key) => {
                        return store?.[key];
                    });
                },
                () => {
                    const persistData = keysToWatch.reduce((acc, key) => {
                        acc[key] = toJS(store[key]);
                        return acc;
                    }, {} as Partial<T>);
                    const serializeData = config.serialize
                        ? config.serialize(persistData)
                        : persistData;
                    localStorage.setItem(config.key, serializeData);
                },
                { delay: config.debounce || 500, fireImmediately: true }
            );
            return () => disposer();
        });

        return store;
    };
}
