const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require("webpack");
const publisher = require("../utils/publisher");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const tokens = require("../tokens");
const pack = require("../utils/pack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const config = require("../app.config");
const exec = require("child_process").exec;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const postCSSConfig = require("../postcss.config");

const extractPcss1 = new ExtractTextPlugin({
    filename: "../public/css/style.css"
});
const extractPcss2 = new ExtractTextPlugin({
    filename: "../public/css/dark.css"
});
const plugins = [
    new CleanWebpackPlugin([path.resolve(__dirname, "../build")], {
        allowExternal: true
    }),
    new CopyWebpackPlugin(
        [
            {
                context: path.resolve(__dirname, "../dev/public"),
                from: "**/*",
                to: path.resolve(__dirname, "../build/public")
            },
            { context: "dev", from: "manifest.json", to: "../" },
            { context: "dev", from: "popup.html", to: "../" },
            { context: "dev", from: "options.html", to: "../" }
        ],
        {
            ignore: ["*.pcss", "pcss/**/*", "css/**/*", "fonts/**/*"]
        }
    ),
    extractPcss1,
    extractPcss2,
    new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),
    new webpack.DefinePlugin({
        ENDPOINT: JSON.stringify(config.prod)
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
];

module.exports = function webpackStuff(env) {
    if (env === "production") plugins.push(new BabiliPlugin());
    console.log("Deleting build folder");
    // exec("rm -rf " + path.join("../build"));
    return {
        entry: {
            popup: "./dev/src/index.js",
            "background/background": "./dev/src/background/background.js",
            "content/content": "./dev/src/content/content.js"
        },
        output: {
            path: path.join(__dirname, "../build/src"),
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
                    test: /\.(jpg|jpe|jpeg|svg)(\?.*$|$)/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "../images/[name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "../fonts/[name].[ext]",
                                publicPath: "public"
                            }
                        }
                    ]
                }
            ]
        },
        plugins
    };
};
