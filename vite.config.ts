import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import {visualizer} from 'rollup-plugin-visualizer'
import path from 'path'
//图片转成base64
//import image from '@rollup/plugin-image'

// https://vitejs.dev/config/
export default defineConfig({
    root: process.cwd(),
    base: '/',
    envDir: './env',
    //定义全局变量
    define: {},
    publicDir: 'public',
    cacheDir: 'node_modules/.vite',
    plugins: [
        // {
        //     ...image(),
        //     enforce: 'pre'
        // },
        react(),
        legacy(),
        {
            ...visualizer({
                filename: './dist/stats.html',
                open: false
            }),
            apply: 'build'
        }
    ],
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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/')
        }
    }
})
