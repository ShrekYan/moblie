const useVw = () => {
    const DESIGN_VIEWPORT_RATIO = 750 / 100; // 7.5

    /**
     * 将像素单位转为视窗单位（vw）
     * @param px 需要转换的像素值
     * @return 转换后的视窗单位字符串(vw)
     */
    const px2Vw = (px: number): string => {
        return `${px / DESIGN_VIEWPORT_RATIO}vw`;
    };

    /**
     * 获取像素值在当前视口中的实际像素大小
     * @param px 设计稿的像素值
     * @param 当前屏幕的实际像素值
     */
    const px2RealPagePx = (px: number): number => {
        return (px * window.screen.width) / 750;
    };

    return {
        px2Vw,
        px2RealPagePx
    };
};

export default useVw;
