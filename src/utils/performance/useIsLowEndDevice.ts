/**
 * 检测地段设备
 */
const useIsLowEndDevice = () => {
    // 1. 内存检测（<1GB 为低端）
    if (
        "deviceMemory" in window.navigator &&
        typeof window.navigator["deviceMemory"] === "number"
    ) {
        if (window.navigator["deviceMemory"] < 1) {
            return true;
        }
    }
    //2.CPU核心数检测(<=2核 为低端)
    if (window.navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
    // 3. UserAgent 匹配已知低端设备（示例）
    const lowEndPhones = /Redmi 7A|Redmi 8A|Galaxy A0|vivo Y[0-9]{2}/i;
    return lowEndPhones.test(navigator.userAgent);
};

export default useIsLowEndDevice;
