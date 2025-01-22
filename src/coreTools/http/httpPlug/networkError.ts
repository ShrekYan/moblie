//import showErrorToastFn from "./showErrorToast";
import type { HttpPluginOptions } from "../http.ts";
import { NETWORK } from "./plugConfig.ts";

type showErrorToastType = (message?: string) => void;

//解决提示方法重复执行导致提示语闪屏现象
const showErrorToast: showErrorToastType = () => {
    console.log("123");
};

export default ({ options }: HttpPluginOptions) => {
    if (!options.backupMockData) {
        showErrorToast(NETWORK.ERROR_MSG);
    }
};
