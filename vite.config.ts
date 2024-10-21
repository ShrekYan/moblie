import {defineConfig} from 'vite'
import viteDevConfig  from './vite.dev.config'
import vitePrdConfig  from './vite.prd.config'


// https://vitejs.dev/config/
export default defineConfig((config) => {
    if(config.command ==='serve'){
        return viteDevConfig;
    }
    return vitePrdConfig;
})
