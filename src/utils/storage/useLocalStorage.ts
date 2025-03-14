type UseLocalStorage = {
    getItem<T>(key: string, callback?: (err: any, value: T | null) => void): T | null;
    setItem<T>(key: string, value: T, callback?: (err: any, value: T | null) => void): T | null;
    removeItem(key: string, callback?: (err: any) => void): void;
    clear(callback?: (err: any) => void): void;
    length(callback?: (err: any, numberOfKeys: number | null) => void): number;
    key(keyIndex: number, callback?: (err: any, key: string | null) => void): string | "";
    keys(callback?: (err: any, keys: string[]) => void): string[];
};

const createLocalStorage = (): UseLocalStorage => {
    const prefix = "galaxy/";

    /**
     * 获取完整的key
     * @param key
     */
    const getFullKey = (key: string): string => {
        return `${prefix}${key}`;
    };

    const windowLocalStorage = window.localStorage;

    return {
        getItem<T>(key: string, callback?: (err: any, value: T | null) => void) {
            const fullKey = getFullKey(key);
            try {
                const value = windowLocalStorage.getItem(fullKey);
                const parsedValue = value ? (JSON.parse(value as string) as T) : value;
                if (callback) {
                    callback(null, parsedValue as T);
                }
                return parsedValue as T;
            } catch (error) {
                if (callback) {
                    callback(error, null);
                }
                return null;
            }
        },
        setItem<T>(
            key: string,
            value: T,
            callback?: (err: any, value: T | null) => void
        ): T | null {
            const fullKey = getFullKey(key);
            try {
                const serializedValue = JSON.stringify(value);
                windowLocalStorage.setItem(fullKey, serializedValue);
                if (callback) {
                    callback(null, serializedValue as T);
                }
                return serializedValue as T;
            } catch (error) {
                if (callback) {
                    callback(error, null);
                }
                return null;
            }
        },
        removeItem(key: string, callback?: (err: any) => void) {
            const fullKey = getFullKey(key);
            try {
                windowLocalStorage.removeItem(fullKey);
                return Promise.resolve();
            } catch (error) {
                callback?.(error);
                return Promise.reject(error);
            }
        },
        clear(callback?: (err: any) => void) {
            try {
                windowLocalStorage.clear();
                callback?.(null);
            } catch (error) {
                callback?.(error);
            }
        },
        length(callback?: (err: any, numberOfKeys: number | null) => void) {
            try {
                const numberOfKeys = windowLocalStorage.length;
                callback?.(null, numberOfKeys);
                return numberOfKeys;
            } catch (error) {
                callback?.(error, null);
                return 0;
            }
        },
        key(keyIndex: number, callback?: (err: any, key: string | null) => void) {
            try {
                const key: string = windowLocalStorage.key(keyIndex) || "";
                callback?.(null, key);
                return key;
            } catch (error) {
                callback?.(error, "");
                return "";
            }
        },
        keys(callback?: (err: any, keys: string[]) => void) {
            try {
                const keys: string[] = windowLocalStorage.keys(callback) || [];
                callback?.(null, keys);
                return keys;
            } catch (error) {
                callback?.(error, []);
                return [];
            }
        }
    };
};

export const localStorage: UseLocalStorage = createLocalStorage();

const useLocalStorage = () => {
    return localStorage;
};

export default useLocalStorage;
