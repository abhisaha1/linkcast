var FileSystem = require("fs");
var path = require("path");
var archiver = require("archiver");
var appConfig = require("../app.config.json");
var exec = require("child_process").exec;

function writeFileToDisk(params, filePath, content) {
    return FileSystem.writeFileSync(path.join(params.root, filePath), content);
}
function readFile(params, filePath) {
    return FileSystem.readFileSync(path.join(params.root, filePath), "utf8");
}
module.exports = function(params, isDev) {
    // // replace html
    var data = readFile(params, "build/src/popup.js");
    data = data.replace(appConfig.dev, appConfig.prod);
    writeFileToDisk(params, "build/src/popup.js", data);
    // //replace background
    var data = readFile(params, "dev/background.js");
    data = data.replace(appConfig.dev, appConfig.prod);
    writeFileToDisk(params, "build/background.js", data);

    //delete scss folder
    exec("rm -rf " + path.join(params.root, "build/public/scss"));

    //zip it
    var output = FileSystem.createWriteStream(params.target);
    var archive = archiver("zip");
    // listen for all archive data to be written
    output.on("close", function() {
        console.log(archive.pointer() + " total bytes");
        console.log(
            "archiver has been finalized and the output file descriptor has closed."
        );
    });
    archive.pipe(output);
    archive.directory(params.src, false);
    archive.finalize();
    if (typeof params.callback == "function") {
        params.callback(params);
    }
};
