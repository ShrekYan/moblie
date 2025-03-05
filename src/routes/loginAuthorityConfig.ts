type GetAuthConfig = () => Record<string, string | string[]>;
type GetIgnoreAuthConfig = GetAuthConfig;

/**
 * 获取权限配置
 * “account”检查account路由下所有的登陆权限配置
 * "account/set"仅检查当前路由下的登陆配置
 */
export const getAuthConfig: GetAuthConfig = () => {
    return {
        account: ["/account", "/tab/my"]
    };
};

/**
 * 忽略权限配置
 * “account”检查account路由下所有的登陆权限配置
 * "account/set"仅检查当前路由下的登陆配置
 */
export const getIgnoreAuthConfig: GetIgnoreAuthConfig = () => {
    return {};
};
