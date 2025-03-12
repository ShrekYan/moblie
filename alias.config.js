const path = require("path");

module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".json", ".vue", ".ts", ".tsx"],
        root: path.resolve(__dirname),
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@api": path.resolve(__dirname, "./src/api"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@business": path.resolve(__dirname, "./src/business"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@core-tools": path.resolve(__dirname, "./src/core-tools"),
            "@page/*": path.resolve(__dirname, "./src/pages"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@local-types": path.resolve(__dirname, "./src/types"),
            "@utils": path.resolve(__dirname, "./src/utils")
        }
    }
};


