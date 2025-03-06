export const PARAMS_CONFIG = {
    SOURCE: "H",
    VERSION: "5.0.0"
};
/**
 * 网络错误
 * @type {{errorMsg: string}}
 */
export const NETWORK = {
    ERROR_MSG: "网络不好，请稍后重试",
    SYS_MSG: "系统繁忙或出错，请联系客服人员"
};

/**
 * 用户自定义报错信息
 * @type {{}}
 */
export const CUSTOM_ERRORS: Record<string, string> = {
    "012017": "登录用户名或密码错误",
    "033001": "您输入的定投区间不足一期，请调整~",
    "036108": "您输入的手机号信息不一致，请重新输入"
};

/**
 * 接口返回类型
 * @type {{SUCCESS: string, SESSION_TIMEOUT: string}}
 */
export const RESPONSE_CODE = {
    SUCCESS: "000000",
    SESSION_TIMEOUT: "000029"
};
