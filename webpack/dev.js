const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const webpack = require("webpack");

const extractSass1 = new ExtractTextPlugin({
    filename: "../public/css/style.css"
});
const extractSass2 = new ExtractTextPlugin({
    filename: "../public/css/dark.css"
});

const plugins = [
    extractSass1,
    extractSass2,
    // new ExtractTextPlugin({
    //     filename: "./bundle.css",
    //     allChunks: true
    // }),
    new webpack.optimize.ModuleConcatenationPlugin()
];

module.exports = function webpackStuff(env) {
    if (env === "production") plugins.push(new BabiliPlugin());

    return {
        devtool: "source-map",
        entry: [
            "./dev/src/index.js",
            "./dev/public/scss/style.scss",
            "./dev/public/scss/themes/dark/dark.scss"
        ],
        output: {
            path: path.join(__dirname, "../dev/src"),
            publicPath: "src",
            filename: "popup.js"
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
