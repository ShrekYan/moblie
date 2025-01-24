//import showErrorToastFn from "./showErrorToast";
import type { HttpPluginOptions } from "../http.ts";
import { NETWORK } from "./constant.ts";
import showErrorToastFn from "@/coreTools/http/httpPlug/showErrorToast.ts";

const showErrorToast = showErrorToastFn();

export default ({ options }: HttpPluginOptions) => {
    if (!options.backupMockData) {
        showErrorToast(NETWORK.ERROR_MSG);
    }
};
