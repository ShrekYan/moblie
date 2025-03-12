/**
 *   * https://github.com/marcuswestin/WebViewJavascriptBridge
 *   * https://github.com/Lision/WKWebViewJavascriptBridge
 * @param callback
 */
const createJsBridge = (callback: (params: typeof window.WebViewJavascriptBridge) => void) => {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge);
    } else {
        //兼容安卓
        document.addEventListener(
            "WebViewJavascriptBridgeReady",
            function () {
                callback(window.WebViewJavascriptBridge);
            },
            true
        );
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];

        const WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "https://__bridge_loaded__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    }
};

export default createJsBridge;
