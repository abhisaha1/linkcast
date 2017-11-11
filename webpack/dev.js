const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require("webpack");
const config = require("../app.config");

const extractPcss1 = new ExtractTextPlugin({
    filename: "../public/css/style.css"
});
const extractPcss2 = new ExtractTextPlugin({
    filename: "../public/css/dark.css"
});

const plugins = [
    extractPcss1,
    extractPcss2,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
        ENDPOINT: JSON.stringify(config.dev)
    })
];

module.exports = function webpackStuff(env) {
    if (env === "production") plugins.push(new BabiliPlugin());

    return {
        devtool: "source-map",
        entry: {
            popup: "./dev/src/index.js",
            "background/background": "./dev/src/background/background.dev.js",
            "../public/pcss/style": "./dev/public/pcss/style.pcss",
            "../public/pcss/dark": "./dev/public/pcss/themes/dark/dark.pcss"
        },
        output: {
            path: path.join(__dirname, "../dev/src"),
            publicPath: "src",
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    query: {
                        presets: ["es2015"],
                        plugins: []
                    },
                    include: [path.resolve(__dirname, "../")]
                },
                {
                    test: /style\.pcss/,
                    use: extractPcss1.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: { importLoaders: 1 }
                            },
                            "postcss-loader"
                        ]
                    })
                },
                {
                    test: /dark\.pcss/,
                    use: extractPcss2.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: { importLoaders: 1 }
                            },
                            "postcss-loader"
                        ]
                    })
                },
                {
                    test: /\.(jpg|jpe|jpeg|svg|webp|gif)(\?.*$|$)/,
                    use: [
                        {
                            loader:
                                "file-loader?name=../../../images/[name].[ext]"
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                    use: [
                        {
                            loader:
                                "file-loader?name=../../../fonts/[name].[ext]"
                        }
                    ]
                }
            ]
        },
        plugins
    };
};
