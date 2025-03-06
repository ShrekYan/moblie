import CryptoJS from "crypto-js";

const SECRET_KEY = "private_key";

/**
 * 对称加密
 * @param str
 */
export const encryptByAES = (str: string) => {
    return CryptoJS.AES.encrypt(str, SECRET_KEY).toString();
};

/**
 * 对称解密
 * @param str
 */
export const decryptByAES = (str: string) => {
    const bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * MD5加密（base64）
 * @param str
 */
export const encryptByMD5 = (str: string) => {
    return CryptoJS.MD5(str).toString(CryptoJS.enc.Base64);
};

const useEncrypt = () => {
    return {
        encryptByAES,
        decryptByAES,
        encryptByMD5
    };
};

export default useEncrypt;
