type UseSessionStorage = {
    getItem<T>(key: string, callback?: (err: any, value: T | null) => void): Promise<T | null>;
    setItem<T>(key: string, value: T, callback?: (err: any, value: T | null) => void): Promise<T>;
    removeItem(key: string, callback?: (err: any) => void): Promise<void>;
    clear(callback?: (err: any) => void): Promise<void>;
    length(callback?: (err: any, numberOfKeys: number | null) => void): Promise<number>;
    key(keyIndex: number, callback?: (err: any, key: string | null) => void): Promise<string>;
    keys(callback?: (err: any, keys: string[]) => void): Promise<string[]>;
};

const useSessionStorage = (): UseSessionStorage => {
    const prefix = "galaxy/";

    /**
     * 获取完整的key
     * @param key
     */
    const getFullKey = (key: string): string => {
        return `${prefix}${key}`;
    };

    return {
        getItem<T>(key: string, callback?: (err: any, value: T | null) => void) {
            const fullKey = getFullKey(key);
            try {
                const value = sessionStorage.getItem(fullKey);
                const parsedValue = value ? (JSON.parse(value) as T) : value;
                if (callback) {
                    callback(null, parsedValue as T);
                }
                return Promise.resolve(parsedValue as T);
            } catch (error) {
                if (callback) {
                    callback(error, null);
                }
                return Promise.reject(error);
            }
        },
        setItem<T>(
            key: string,
            value: T,
            callback?: (err: any, value: T | null) => void
        ): Promise<T> {
            const fullKey = getFullKey(key);
            try {
                const serializedValue = JSON.stringify(value);
                sessionStorage.setItem(fullKey, serializedValue);
                if (callback) {
                    callback(null, serializedValue as T);
                }
                return Promise.resolve(serializedValue as T);
            } catch (error) {
                if (callback) {
                    callback(error, null);
                }
                return Promise.reject(error);
            }
        },
        removeItem(key: string, callback?: (err: any) => void) {
            const fullKey = getFullKey(key);
            try {
                sessionStorage.removeItem(fullKey);
                return Promise.resolve();
            } catch (error) {
                callback?.(error);
                return Promise.reject(error);
            }
        },
        clear(callback?: (err: any) => void) {
            try {
                sessionStorage.clear();
                callback?.(null);
                return Promise.resolve();
            } catch (error) {
                callback?.(error);
                return Promise.reject(error);
            }
        },
        length(callback?: (err: any, numberOfKeys: number | null) => void) {
            try {
                const numberOfKeys = sessionStorage.length;
                callback?.(null, numberOfKeys);
                return Promise.resolve(numberOfKeys);
            } catch (error) {
                callback?.(error, null);
                return Promise.reject(error);
            }
        },
        key(keyIndex: number, callback?: (err: any, key: string | null) => void) {
            try {
                const key: string = sessionStorage.key(keyIndex) || "";
                callback?.(null, key);
                return Promise.resolve(key);
            } catch (error) {
                callback?.(error, "");
                return Promise.reject(error);
            }
        },
        keys(callback?: (err: any, keys: string[]) => void) {
            try {
                const keys: string[] = sessionStorage.keys(callback) || [];
                callback?.(null, keys);
                return Promise.resolve(keys);
            } catch (error) {
                callback?.(error, []);
                return Promise.reject(error);
            }
        }
    };
};

export default useSessionStorage;
