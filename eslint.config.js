import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
//import prettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const specialRule = "off";
export default tseslint.config(
    { ignores: ["dist", "vite.prd.config.ts", "vite.dev.config.ts", "vite.config.ts"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
            // 'eslint-plugin-prettier':prettier1
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true }
            ],
            "@typescript-eslint/no-unsafe-function-type": "off",
            //todo 暂时先添加any，后续需要删除
            "@typescript-eslint/no-explicit-any":"off"
        }
    }
);
