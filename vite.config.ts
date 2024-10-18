import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import {visualizer} from 'rollup-plugin-visualizer'
//图片转成base64
//import image from '@rollup/plugin-image'

// https://vitejs.dev/config/
export default defineConfig({
    root: process.cwd(),
    base: '/',
    envDir:'./env',
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
            apply:'build'
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
    }
})
