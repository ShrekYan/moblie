import postCssVw from 'postcss-px-to-viewport-8-plugin'
import postCssAutoprefixer from 'autoprefixer'
import postPresetEnv from 'postcss-preset-env'
import postInitial  from 'postcss-initial'
import postcssColorFunctionalNotation from 'postcss-color-functional-notation'


export default {
    plugins: [
        postCssVw({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 3,
            viewportUnit: 'vw',
            minPixelValue: 1
        }),
        postCssAutoprefixer,
        postPresetEnv(),
        postInitial({
            reset:'inherited'
        }),
        postcssColorFunctionalNotation(),
    ]
}