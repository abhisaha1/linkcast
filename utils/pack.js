var FileSystem = require("fs");
var path = require("path");
var archiver = require("archiver");
var exec = require("child_process").exec;

module.exports = function(params, isDev) {
    //clean up
    console.log("Cleaning up files");
    exec("rm -rf " + path.join(params.root, "build/public/scss"));
    console.log("Zipping Linkcast..");
    //zip it
    var output = FileSystem.createWriteStream(params.target);
    var archive = archiver("zip");

    // listen for all archive data to be written
    output.on("close", function() {
        console.log(archive.pointer() + " total bytes");
        console.log("Zipped successfully.");
    });
    archive.pipe(output);
    archive.directory(params.src, false);
    archive.finalize();
    if (typeof params.callback == "function") {
        params.callback(params);
    }
};
