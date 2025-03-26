import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
import { ConfigEnv, UserConfig } from "vite";

export default (config: ConfigEnv) => {
    console.log(config);
    return {
        root: process.cwd(),
        base: "/",
        mode: "development",
        //定义全局变量
        define: {
            //todo
            "window.VITE_API_URL": JSON.stringify("https://api.example.com")
        },
        publicDir: "public",
        cacheDir: "node_modules/.vite",
        plugins: [
            //模块联邦
            federation({
                remotes: {
                    reactSubapp: "http://localhost:5725/assets/remoteEntry.js" // 子应用部署地址
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
            // {
            //     ...image(),
            //     enforce: 'pre'
            // },
            react(),
            legacy()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                "@api": path.resolve(__dirname, "./src/api"),
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@business": path.resolve(__dirname, "./src/business"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@core-tools": path.resolve(__dirname, "./src/core-tools"),
                "@page/*": path.resolve(__dirname, "./src/pages"),
                "@routes": path.resolve(__dirname, "./src/routes"),
                "@local-types": path.resolve(__dirname, "./src/types"),
                "@utils": path.resolve(__dirname, "./src/utils")
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                         @import "/src/assets/css/variables.scss";
                         @import "/src/assets/css/mixin.scss";
                         @import "/src/assets/css/function.scss";
                         `
                }
            },
            modules: {
                scopeBehaviour: "local",
                localsConvention: "camelCase"
            },
            devSourcemap: false,
            transformer: "postcss",
            preprocessorMaxWorkers: 0
        },
        json: {
            namedExports: true,
            stringify: "auto"
        },
        logLevel: "info",
        clearScreen: true,
        envDir: "./env",
        envPrefix: "VITE_",
        server: {
            port: 8888
        },
        appType: "spa",
        build: {
            target: "modules",
            modulePreload: true,
            outDir: "./dist",
            assetsDir: "./assets",
            assetsInlineLimit: 4096, //(4kb)
            cssCodeSplit: true,
            sourcemap: false,
            manifest: false,
            minify: "esbuild",
            write: true,
            emptyOutDir: true,
            chunkSizeWarningLimit: 500,
            copyPublicDir: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        "react-vendor": ["react", "react-dom", "react-router-dom"]
                    }
                },
                maxParallelFileOps: 30
            }
        }
    } as UserConfig;
};
