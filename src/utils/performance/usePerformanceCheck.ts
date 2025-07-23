import { useEffect } from "react";

// 为长任务性能条目定义扩展类型
interface PerformanceLongTaskTiming extends PerformanceEntry {
    attribution: Array<{
        name: string;
        entryType: string;
        startTime: number;
        duration: number;
        containerType?: string;
        containerId?: string;
        containerSrc?: string;
        containerName?: string;
    }>;
}

const usePerformanceCheck = () => {
    useEffect(() => {
        // 1. 检测关键加载性能指标
        const checkLoadMetrics = () => {
            if (!("performance" in window)) return;

            const timing = performance.timing;
            if (!timing) return;

            const { domContentLoadedEventEnd, navigationStart } = timing;

            if (domContentLoadedEventEnd && navigationStart) {
                const firstPaint = domContentLoadedEventEnd - navigationStart;
                if (firstPaint > 5000) {
                    console.warn(`[性能警告] 首次内容加载时间过长: ${firstPaint}ms`);
                }
            }
        };

        // 2. 监听JS长任务阻塞
        let observer: PerformanceObserver | null = null;

        if ("PerformanceObserver" in window) {
            const handleLongTask = (list: PerformanceObserverEntryList) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 100) {
                        // 安全处理长任务特有的attribution属性
                        const longTaskEntry = entry as unknown as PerformanceLongTaskTiming;
                        const source = longTaskEntry.attribution?.length
                            ? longTaskEntry.attribution[0].name || "unknown"
                            : "unknown";

                        console.warn(`[阻塞警告] 长任务阻塞主线程: 
              Duration: ${entry.duration.toFixed(2)}ms 
              Source: ${source}`);
                    }
                });
            };

            try {
                observer = new PerformanceObserver(handleLongTask);
                // 使用现代API格式 { type: 'longtask' } 替代废弃的 entryTypes
                observer.observe({ type: "longtask", buffered: true });
            } catch (e) {
                console.error("PerformanceObserver 初始化失败:", e);
            }
        }

        // 检查API支持后执行
        if ("timing" in performance) {
            setTimeout(checkLoadMetrics, 0);
        }

        // 清理函数
        return () => {
            observer?.disconnect();
        };
    }, []);
};

export default usePerformanceCheck;
