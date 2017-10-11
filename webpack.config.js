const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require("webpack");

const plugins = [
    new ExtractTextPlugin({
        filename: "./bundle.css",
        allChunks: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
];

module.exports = function webpackStuff(env) {
    if (env === "production") plugins.push(new BabiliPlugin());

    return {
        devtool: "source-map",
        entry: [
            "./dev/src/index.js",
            "./dev/public/scss/app/style.scss",
            "./dev/public/scss/themes/dark/dark.scss"
        ],
        output: {
            filename: "popup.js",
            path: path.resolve(__dirname, "./src")
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
                    include: [path.resolve(__dirname, "./")]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: "css-loader?importLoaders=1"
                    })
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                includePaths: ["styles"]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                    use: [{ loader: "file-loader" }]
                }
            ]
        },
        plugins
    };
};
