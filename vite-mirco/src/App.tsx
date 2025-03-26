import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import routes from "./routes";

declare global {
    interface Window {
        IS_MAIN_APP?: boolean;
    }
}

console.log("window.IS_MAIN_APP", window.IS_MAIN_APP);

// 子应用 SubAppLayout.tsx
export default function SubAppLayout() {
    if (window.IS_MAIN_APP) {
        return (
            <div className="subapp-container">
                <header>子应用导航栏</header>
                <Outlet /> // 关键：子路由渲染出口
            </div>
        );
    } else {
        return <RouterProvider router={createHashRouter(routes)} />;
    }
}
