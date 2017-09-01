var CopyWebpackPlugin = require("copy-webpack-plugin");
var http = require("http");
var fs = require("fs");
var path = require("path");

module.exports = function(rootPath) {
    console.log("copying");
    return new CopyWebpackPlugin(
        [
            // {output}/file.txt
            { context: "dev", from: "*", to: "../build/" },
            { context: "dev", from: "public/**/*", to: "../build/" }
        ],
        {
            ignore: ["popup.js"]
        }
    );
};
