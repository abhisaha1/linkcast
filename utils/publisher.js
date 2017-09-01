const chromeWebStore = require("./lib/chrome_web_store");
const extensionVersion = require("./lib/extension_version");
const FileSystem = require("fs");
const path = require("path");
const sprintf = require("sprintf");
const JSZip = require("jszip");

let accessTokenParams = {};

function readManifest(packagePath) {
    let manifest = FileSystem.readFileSync(packagePath, "utf8");
    return JSON.parse(manifest);
}

const store = function(params) {
    const { manifestPath, tokens, archive } = params;
    const { appId, clientId, clientSecret, refreshToken } = tokens;
    console.log("Refreshing Chrome Web Store access token...");
    const appManifest = readManifest(manifestPath);
    chromeWebStore
        .getAccessToken(clientId, clientSecret, refreshToken)
        .then(_accessTokenParams => {
            accessTokenParams = _accessTokenParams;
            return chromeWebStore.getPackage(
                appId,
                accessTokenParams.access_token
            );
        })
        .then(result => {
            const response = result[0];
            const body = JSON.parse(result[1]);
            if (body.crxVersion) {
                console.log("Current version on store: '%s'", body.crxVersion);
                console.log(
                    "Current version on local: '%s'",
                    appManifest.version
                );
            }
            return chromeWebStore.uploadPackage(
                archive,
                appId,
                accessTokenParams.access_token
            );
        })
        .then(result => {
            const response = result[0];
            const body = result[1];

            if (response.statusCode !== 200) {
                throw new Error(
                    sprintf(
                        "Package upload failed: %d %s",
                        response.statusCode,
                        body
                    )
                );
            }
            const uploadResult = JSON.parse(body);
            if (uploadResult.uploadState == "FAILURE") {
                const currentVersionRegex = /larger version in file manifest.json than the published package: ([0-9.]+)/;
                if (uploadResult.itemError) {
                    throw new Error(
                        sprintf(
                            "Package upload error: %s",
                            JSON.stringify(uploadResult)
                        )
                    );
                }
            } else {
                console.log("Publishing updated package", appId);
                return chromeWebStore.publishPackage(
                    appId,
                    accessTokenParams.access_token
                );
            }
        })
        .then(result => {
            const response = result[0];
            const body = result[1];
            if (response.statusCode !== 200) {
                throw new Error(
                    sprintf(
                        "Publishing updated package failed: %d %s",
                        response.statusCode,
                        body
                    )
                );
            }
            const publishResult = JSON.parse(body);
            if (publishResult.itemError) {
                throw new Error(
                    sprintf(
                        "Package publish error: %s",
                        JSON.stringify(publishResult)
                    )
                );
            }
            console.log("Updated package has been queued for publishing");
        })
        .catch(err => {
            console.error("Publishing updated package failed: %s", err);
            fatalError(err);
        });
};

module.exports = {
    publish: function(params) {
        store(params);
    }
};
