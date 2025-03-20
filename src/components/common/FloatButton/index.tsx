import React, { useRef, useEffect } from "react";
import Hammer from "hammerjs";
import style from "./index.module.scss";

type XYPoint = { x: number; y: number };

const FloatButton: React.FC<{ url: string }> = ({ url }) => {
    const floatButtonElementRef = useRef<HTMLDivElement>(null);
    //开始位置
    const startPointRef = useRef<XYPoint>({
        x: 0,
        y: 0
    });
    //结束位置
    const endPointRef = useRef<XYPoint>({
        x: 0,
        y: 0
    });
    //偏移量
    const offsetPointRef = useRef<XYPoint>({
        x: 0,
        y: 0
    });
    /**
     * 移动
     * @param move
     */
    const handleMove = (move: XYPoint) => {
        if (floatButtonElementRef.current) {
            floatButtonElementRef.current.style.cssText = `transform:translate3d(${move.x}px,${move.y}px,0);`;
        }
    };
    //初始化浮标位置
    useEffect(() => {
        //屏幕宽度
        const windowWidth = window.innerWidth;
        //屏幕高度
        const windowHeight = window.innerHeight;
        if (floatButtonElementRef.current) {
            offsetPointRef.current = {
                x: windowWidth - floatButtonElementRef.current.clientWidth,
                y: windowHeight / 2
            };
            handleMove(offsetPointRef.current);
        }
    }, []);
    //监听元素手势滑动
    useEffect(() => {
        const hammer = new Hammer(floatButtonElementRef.current as HTMLDivElement, {
            touchAction: "none", // 禁用浏览器默认触摸行为
            domEvents: true, // 启用 DOM 事件
            inputClass: Hammer.TouchInput // 强制使用触摸输入
        });

        // 配置 pan 识别器
        hammer.get("pan").set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 1, // 更灵敏的触发阈值
            pointers: 1 // 单指操作
        });

        hammer.on("panstart", (event) => {
            event.preventDefault(); // 关键代码
            startPointRef.current.x = event.deltaX;
            startPointRef.current.y = event.deltaY;
        });
        hammer.on("panmove", (event) => {
            event.preventDefault(); // 关键代码
            endPointRef.current.x = event.deltaX;
            endPointRef.current.y = event.deltaY;
            const move = {
                x: offsetPointRef.current.x + (endPointRef.current.x - startPointRef.current.x),
                y: offsetPointRef.current.y + (endPointRef.current.y - startPointRef.current.y)
            };
            handleMove(move);
        });

        hammer.on("panend", (event) => {
            event.preventDefault(); // 关键代码
            const currentOffset = {
                x: offsetPointRef.current.x + (endPointRef.current.x - startPointRef.current.x),
                y: offsetPointRef.current.y + (endPointRef.current.y - startPointRef.current.y)
            };
            //屏幕宽度
            const windowWidth = window.innerWidth;
            //屏幕高度
            const windowHeight = window.innerHeight;

            const move = {
                x: 0,
                y: 0
            };

            //左右滑动限制
            if (currentOffset.x > windowWidth / 2) {
                if (floatButtonElementRef?.current) {
                    move.x = windowWidth - floatButtonElementRef.current.clientWidth;
                } else {
                    move.x = 0;
                }
            }
            //上下滑动限制
            if (currentOffset.y < 0) {
                move.y = 0;
            } else if (
                currentOffset.y >
                windowHeight - (floatButtonElementRef?.current?.clientHeight || 0)
            ) {
                move.y = windowHeight - (floatButtonElementRef?.current?.clientHeight || 0);
            } else {
                move.y = currentOffset.y;
            }
            //移动位置
            handleMove(move);

            console.log(move);
            //设置偏移位
            offsetPointRef.current = {
                x: move.x,
                y: move.y
            };
        });
    }, []);

    return (
        <div className={style.floatButtonWrap} ref={floatButtonElementRef}>
            <img src={url} />
        </div>
    );
};

export default FloatButton;
