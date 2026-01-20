// import { StrictMode } from "react"
import { unstableSetRender } from "antd-mobile";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";

// 2. 使用 unstableSetRender 配置渲染函数
unstableSetRender((node, container) => {
    // 检查容器是否已有根节点，若无则创建
    (container as any)._reactRoot ||= createRoot(container);
    const root = (container as any)._reactRoot;
    // 渲染组件
    root.render(node);
    // 返回一个异步清理函数
    return async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        root.unmount();
    };
});

createRoot(document.getElementById("root")!).render(
    //兼容react-activation库，需要关闭StrictMode
    <>
        {/*<StrictMode>*/}
        <App />
        {/* </StrictMode>*/}
    </>
);
