import useLocalStorage from "@/helpers/useLocalStorage.ts";
import type { UserInfoModal } from "@/types/common/userInfoModal.ts";

const useCacheUserInfo = () => {
    const localStorage = useLocalStorage();
    const localStorageKey = "userInfo";

    /**
     * 获取缓存的用户信息
     */
    const getCachedUserInfo = () => {
        return localStorage.getItem<UserInfoModal>(localStorageKey);
    };

    /**
     * 设置缓存的用户信息
     * @param userInfo
     */
    const setCachedUserInfo = (userInfo: UserInfoModal) => {
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
