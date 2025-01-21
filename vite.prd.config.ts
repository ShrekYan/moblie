import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import type { UserConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";
//import checker from 'vite-plugin-checker'
//gzip
//import { compression } from 'vite-plugin-compression2'
//import cdn from 'vite-plugin-cdn-import'

export default {
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
        legacy(),
        removeConsole(),
        {
            ...visualizer({
                filename: "./dist/stats.html",
                open: false
            }),
            apply: "build"
        }
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
                        @import "/src/assets/css/mixin.scss";`
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
        target: "modules",
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
        rollupOptions:{
            output:{
                manualChunks:{
                    'react-vendor':['react','react-dom','react-router-dom']
                }
            },
            parallel:true,
            maxParallelFileOps:30
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