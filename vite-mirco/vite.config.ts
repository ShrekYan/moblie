// 子应用 vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
    plugins: [
        federation({
            name: "remote-app",
            filename: `remoteEntry.js`, // 动态哈希文件名
            exposes: {
                // 暴露路由入口组件和路由配置
                "./Router": "./src/App.tsx",
                "./routes": "./src/routes.tsx"
            },
            shared: [
                "react",
                "react-dom",
                {
                    "react-router-dom": {
                        singleton: true,
                        eager: true
                    }
                } as never
            ]
        }),
        react()
    ],
    css: {
        modules: {
            scopeBehaviour: "local",
            localsConvention: "camelCase"
        }
    },
    server: {
        port: 3001, // 子应用端口
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*" // 允许跨域
        }
    },
    build: {
        target: "esnext"
    }
});
