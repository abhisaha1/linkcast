function isValid(version) {
    return version.match(/^([0-9]+\.){0,3}[0-9]+$/) !== null;
}

function lessThan(versionA, versionB) {
    if (versionA != "" && !isValid(versionA)) {
        throw new Error("Extension version " + versionA + " is not valid");
    }
    if (versionB != "" && !isValid(versionB)) {
        throw new Error("Extension version " + versionB + " is not valid");
    }

    const aParts = versionA.split(".");
    const bParts = versionB.split(".");

    const partsLength = Math.max(aParts.length, bParts.length);

    for (let x = 0; x < partsLength; x++) {
        const aVal = isNaN(aParts[x]) ? 0 : +aParts[x];
        const bVal = isNaN(bParts[x]) ? 0 : +bParts[x];
        if (aVal !== bVal) {
            return aVal < bVal;
        }
    }
    // if we reached the end of the loop the 2 version are equals
    return false;
}

function increment(version, componentIndex) {
    return version
        .split(".")
        .map((component, index) => {
            if (index === componentIndex) {
                return (parseInt(component) + 1).toString();
            } else {
                return component;
            }
        })
        .join(".");
}

module.exports = {
    isValid,
    lessThan,
    increment
};
