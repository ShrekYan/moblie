import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import {visualizer} from "rollup-plugin-visualizer";
import path from "path";
import type {UserConfig} from "vite";
import removeConsole from 'vite-plugin-remove-console'
//import checker from 'vite-plugin-checker'
//gzip
//import { compression } from 'vite-plugin-compression2'
//import cdn from 'vite-plugin-cdn-import'

export default {
    root: process.cwd(),
    base: '/',
    //定义全局变量
    define: {},
    publicDir: 'public',
    cacheDir: 'node_modules/.vite',
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
                filename: './dist/stats.html',
                open: false
            }),
            apply: 'build'
        }
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                         @import "./src/styles/variables.scss"; 
                         @import "./src/styles/mixin.scss";`,
            }
        },
        modules: {
            scopeBehaviour: 'local',
            localsConvention: 'camelCaseOnly'
        }
    },
    json: {
        namedExports: true,
        stringify: false
    },
    logLevel: 'info',
    clearScreen: true,
    envDir: './env',
    envPrefix: 'VITE_',
    server: {
        port: 8888
    },
    build: {
        target: 'modules',
        modulePreload: true,
        outDir: './dist',
        assetsDir: './assets',
        assetsInlineLimit: 4096, //(4kb)
        cssCodeSplit: true,
        sourcemap: false,
        manifest: false,
        minify: 'esbuild',

        write: true,
        emptyOutDir: true,
        chunkSizeWarningLimit: 500
    }
} as UserConfig;