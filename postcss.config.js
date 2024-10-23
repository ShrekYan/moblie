import antdv5 from "./postcss-antdv5.js";
import postCssVw from "postcss-px-to-viewport-8-plugin";
import postCssAutoprefixer from "autoprefixer";
import postPresetEnv from "postcss-preset-env";
import postInitial from "postcss-initial";
import postcssColorFunctionalNotation from "postcss-color-functional-notation";
import fixes from "postcss-flexbugs-fixes";


export default {
    plugins: [
        antdv5(),
        postCssVw({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: "vw",
            minPixelValue: 1
        }),
        postCssAutoprefixer(),
        postPresetEnv(),
        postInitial({
            reset: "inherited"
        }),
        postcssColorFunctionalNotation(),
        fixes()
    ]
};