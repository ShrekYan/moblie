function createPxReplace() {
    return function (m, $1) {
        if (!$1) return m;
        const pixels = parseFloat($1);
        const viewportUnit = 'px';
        const minPx = 1;
        const unitNumber = 2;
        if (pixels > minPx) {
            return pixels * unitNumber + viewportUnit;
        }
        return pixels + viewportUnit;
    };
}

const postcssAntdv5 = function () {
    const pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;
    return function (css) {
        css.walkDecls(function (decl, i) {
            if (!decl.parent.selector || !decl.value || decl.value.indexOf('px') === -1) return;
            if (decl.parent.selector.indexOf('.adm-') > -1 || decl.parent.selector.indexOf(':root') > -1) {
                const pxReplace = createPxReplace();
                decl.value = decl.value.replace(pxRegex, pxReplace);
            }
        });
    }
}


export default postcssAntdv5;
