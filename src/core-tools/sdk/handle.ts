/**
 * 递归加载创建script标签，考虑到SDK有依赖性问题，所以采用加载完成一个文件后再加载下一个文件
 * @param urlList
 * @param index
 * @param successCallback
 */
export const createScript = function (urlList: string[], index = 0, successCallback?: () => void) {
    const executeNumber = urlList.length;
    if (index === executeNumber) {
        successCallback?.();
        return;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = urlList[index];
    script.onload = () => {
        createScript(urlList, ++index, successCallback);
    };
    window.document.head.appendChild(script);
};
