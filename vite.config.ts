import { defineConfig } from "vite";
import viteDevConfig from "./vite.dev.config";
import vitePrdConfig from "./vite.prd.config";


// https://vitejs.dev/config/
export default defineConfig((config) => {
    //本地启动配置
    if (config.command === "serve") {
        return viteDevConfig(config);
    }
    //build配置
    return vitePrdConfig(config);
});
