const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require("webpack");
var publisher = require("../utils/publisher");
var tokens = require("../tokens");
var pack = require("../utils/pack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

const extractSass1 = new ExtractTextPlugin({
    filename: "../public/css/style.css"
});
const extractSass2 = new ExtractTextPlugin({
    filename: "../public/css/themes/dark/dark.css"
});
const plugins = [
    extractSass1,
    extractSass2,
    new CopyWebpackPlugin([
        {
            context: path.resolve(__dirname, "../dev/public"),
            from: "**/*",
            to: path.resolve(__dirname, "../build/public")
        },
        { context: "dev", from: "background.js", to: "../" },
        { context: "dev", from: "content.js", to: "../" },
        { context: "dev", from: "manifest.json", to: "../" },
        { context: "dev", from: "popup.html", to: "../" },
        { context: "dev", from: "options.html", to: "../" }
    ]),
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

    return {
        entry: { popup: "./dev/src/index.js" },
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
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: "css-loader?importLoaders=1"
                    })
                },
                {
                    test: /\.scss$/,
                    include: path.resolve(__dirname, "../dev/public/scss"),
                    use: extractSass1.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader"]
                    })
                },
                {
                    test: /\.scss$/,
                    include: path.resolve(
                        __dirname,
                        "../dev/public/scss/themes/dark/"
                    ),
                    use: extractSass2.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader"]
                    })
                },
                {
                    test: /\.(jpg|jpe|jpeg|svg)(\?.*$|$)/,
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
