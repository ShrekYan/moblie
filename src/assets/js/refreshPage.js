//监听客户端css、js（刷新部署完成后的文件404，导致页面直接白屏）
window.addEventListener("error", function(event) {
   /* //将刷新次数缓存在本地，刷三次后就不再刷新
    var externalChannelReloadTime = Number(sessionStorage.getItem("externalChannelReloadTime"));
    if (event.srcElement.localName === 'link' || event.srcElement.localName === 'script') {
        //报错文件路径
        var errorFile = event.srcElement.src || event.srcElement.href;
        var negativeOne = -1;
        //galaxy域名下的文件报错才刷新，其他域名下文件报错忽略
        if (errorFile.indexOf("galaxy.qiangungun.com") > negativeOne && externalChannelReloadTime <= 8) {
            //如果本地没有缓存刷新次数，设置刷新次数为1
            if (!externalChannelReloadTime) {
                sessionStorage.setItem("externalChannelReloadTime", 1);
            } else {
                //如果本地有缓存次数，刷新后次数+1
                sessionStorage.setItem("externalChannelReloadTime", Number(externalChannelReloadTime) + 1);
            }
            console.error("galaxy域名下文件有报错，需要刷新页面，文件名为==>", errorFile);
            window.location.reload();
        } else {
            console.error("galaxy域名下文件有报错，页面已达到刷新上限" + externalChannelReloadTime + "次，不再刷新页面")
        }
    }*/
});