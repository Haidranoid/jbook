const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// TODO - learn about optimization
module.exports = {
    mode: process.env.NODE_ENV || 'production',
    devtool: 'inline-source-map',
    target: "web",

    entry: "./src/index.tsx",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.json",
                }
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/static'
            }]
        }),
        //new BundleAnalyzerPlugin()
    ],
};
