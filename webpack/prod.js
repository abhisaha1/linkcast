var webpack = require("webpack");
var SassPlugin = require("sass-webpack-plugin");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var path = require("path");
var publisher = require("../utils/publisher");
var tokens = require("../tokens");
var pack = require("../utils/pack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        popup: path.resolve(__dirname, "../dev/popup.js")
    },
    output: {
        path: path.join(__dirname, "../build"),
        filename: "[name].js"
    },
    plugins: [
        new StringReplacePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true
        }),
        new CopyWebpackPlugin([
            {
                context: path.resolve(__dirname, "../dev"),
                from: "**/*",
                to: path.resolve(__dirname, "../build")
            }
        ]),
        // //new SassPlugin("dev/css/themes/dark.scss"),
        function() {
            this.plugin("done", function(statsData) {
                var stats = statsData.toJson();
                if (!stats.errors.length) {
                    //pack the build
                    pack({
                        root: path.join(__dirname, "../"),
                        src: path.join(__dirname, "../build/"),
                        target: path.join(__dirname, "../linkcast.zip"),
                        callback: params => {
                            let manifest = path.join(
                                __dirname,
                                "../dev/manifest.json"
                            );
                            //publish to chrome
                            publisher.publish({
                                archive: params.target,
                                tokens: tokens,
                                manifestPath: manifest
                            });
                        }
                    });
                }
            });
        }
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: "file-loader?name=[path][name].[ext]" }]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["dev/css/themes/dark.scss"]
                        }
                    }
                ]
            }
        ]
    }
};
