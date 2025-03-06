import useLocalStorage from "@/utils/storage/useLocalStorage.ts";
import type { UserInfo } from "@/types/common/userInfo.ts";

const useCacheUserInfo = () => {
    const localStorage = useLocalStorage();
    const localStorageKey = "userInfo";

    /**
     * 获取缓存的用户信息
     */
    const getCachedUserInfo = () => {
        return localStorage.getItem<UserInfo>(localStorageKey);
    };

    /**
     * 设置缓存的用户信息
     * @param userInfo
     */
    const setCachedUserInfo = (userInfo: UserInfo) => {
        return localStorage.setItem(localStorageKey, userInfo);
    };

    /**
     * 删除用户的缓存信息
     */
    const removeCacheUserInfo = () => {
        return localStorage.removeItem(localStorageKey);
    };

    return {
        getCachedUserInfo: getCachedUserInfo,
        setCachedUserInfo: setCachedUserInfo,
        removeCacheUserInfo: removeCacheUserInfo
    };
};

export default useCacheUserInfo;
