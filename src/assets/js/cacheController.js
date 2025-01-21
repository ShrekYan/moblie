/*
* 修复缓存造成的相关问题
* 20200508 修复iOS 13.4以上版本从galaxy项目跳转到外部页面后再返回到galaxy不会重新请求数据的问题
* */

(function (window) {
    function _getBrowserInformation() {
        var ua = window.navigator.userAgent || '';
        var browserInfo = {};
        browserInfo.isIos = /iphone|ipad|ipod/i.test(ua);
        browserInfo.isAndroid = !browserInfo.isIos;
        browserInfo.isWechat = /micromessenger\/([\d.]+)/i.test(ua);
        browserInfo.isOriginalChrome = /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua) && browserInfo.isAndroid && ua.indexOf('Version') < 0;
        browserInfo.isSafari = /safari\/([\d.]+)$/i.test(ua) && browserInfo.isIos && ua.indexOf('Crios') < 0 && ua.indexOf('Mozilla') === 0;
        if (browserInfo.isIos) {
            var iosVersion = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            browserInfo.iosVersion = iosVersion[1] + '.' + iosVersion[2];
        }
        return browserInfo;
    };

    var _browserObject = _getBrowserInformation();
    var _iosVersion = _browserObject.iosVersion;
    var _versionNumber = _iosVersion ? window.parseFloat(_iosVersion) : null;
    var _fixIosVersionNumber = 13.4;
    if (_versionNumber && _versionNumber >= _fixIosVersionNumber && _browserObject.isIos) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload()
            }
        };
    }
})(window);


