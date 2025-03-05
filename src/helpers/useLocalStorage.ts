import localforage from "localforage";

const useLocalStorage = () => {
    const localforageInstance = localforage.createInstance({
        name: "galaxy",
        driver: [
            localforage.WEBSQL,
            localforage.LOCALSTORAGE
            //禁用indexDB
        ].filter((driver) => driver !== localforage.INDEXEDDB)
    });
    return {
        getItem: localforageInstance.getItem,
        setItem: localforageInstance.setItem,
        removeItem: localforageInstance.removeItem,
        clear: localforageInstance.clear,
        length: localforageInstance.length,
        key: localforageInstance.key,
        keys: localforageInstance.keys
    };
};

export default useLocalStorage;
