import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { ConfigEnv, UserConfig } from "vite";

export default (config:ConfigEnv) => {
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
            // {
            //     ...image(),
            //     enforce: 'pre'
            // },
            react(),
            legacy()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/")
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
}