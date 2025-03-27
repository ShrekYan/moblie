import react from "@vitejs/plugin-react";
//import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { ConfigEnv, UserConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";
import { viteVConsole } from "vite-plugin-vconsole";
import federation from "@originjs/vite-plugin-federation";
//import checker from 'vite-plugin-checker'
//gzip
//import { compression } from 'vite-plugin-compression2'
//import cdn from 'vite-plugin-cdn-import'

export default (config: ConfigEnv) => {
    return {
        root: process.cwd(),
        base: "/",
        mode: "production",
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
            //可以通过nginx配置GZIP
            /*     compression(),*/
            /*   cdn({
                   modules:[
                       {
                           name:'react',
                           var:'React',
                           path:'https://cdn.bootcdn.net/ajax/libs/react/18.3.1/umd/react.production.min.js'
                       }
                   ]
               }),
               */

            /*    {
                    ...image(),
                    enforce: 'pre'
                },*/

            /*  checker({
                  typescript:true
              }),*/
            react(),
            //开启模块联邦不适用legacy
            //legacy(),
            removeConsole(),
            {
                ...visualizer({
                    filename: "./dist/stats.html",
                    open: false
                }),
                apply: "build"
            },
            //除了预发和生产环境，其他环境都打开vconsole.log
            (config.mode !== "production" && config.mode !== "pre") ? viteVConsole({
                entry: path.resolve(__dirname, "./src/main.tsx"),
                enabled: true,
                config: {
                    theme: "dark"
                }
            }) : null
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
        appType: "spa",
        server: {
            port: 8888
        },
        build: {
            //开启模块联邦不适用 targets: ["ie >= 10", ">0.3%, ios >= 9"],
            //targets: ["ie >= 10", ">0.3%, ios >= 9"],
            target:["esnext"],
            modulePreload: true,
            outDir: "./dist",
            assetsDir: "./assets",
            assetsInlineLimit: 4096, //(4kb)
            cssCodeSplit: true,
            sourcemap: false,
            manifest: false,
            minify: false,
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
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //         drop_debugger: true
            //     },
            //     mangle: true
            // }
        }
    } as UserConfig;
}