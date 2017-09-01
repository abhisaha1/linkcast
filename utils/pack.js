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
    // replace html
    var data = readFile(params, "dev/popup.html");
    data = data.replace(appConfig.wpServer + "build/", "");
    writeFileToDisk(params, "build/popup.html", data);

    //replace environment
    var data = readFile(params, "dev/env.js");
    data = data.replace('window.APP_ENV = "dev"', 'window.APP_ENV = "prod"');
    writeFileToDisk(params, "build/env.js", data);

    //replace background
    var data = readFile(params, "dev/background.js");
    data = data.replace(appConfig.dev, appConfig.prod);
    writeFileToDisk(params, "build/background.js", data);

    //remove js folder
    exec("rm -rf " + path.join(params.root, "build/js"), function(
        err,
        stdout,
        stderr
    ) {
        // zip it.
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
    });
};
