var FileSystem = require("fs");
var manifest = require("../dev/manifest.json");
var package = require("../package.json");
var path = require("path");

function writeToDisk(fileName, content) {
    FileSystem.writeFile(fileName, JSON.stringify(content), "utf8");
}

module.exports = (function() {
    package.version = manifest.version;
    if (process.argv[2]) {
        var newVersion = process.argv[2];
        package.version = newVersion;
        manifest.version = newVersion;
        writeToDisk(path.join(__dirname, "../dev/manifest.json"), manifest);
        console.log("Updated version to ", process.argv[2]);
    }
    writeToDisk(path.join(__dirname, "../package.json"), package);
    console.log("Updated package version from manifest version");
})();
