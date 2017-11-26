module.exports = function(passed_message, callback) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(
        tabs
    ) {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, passed_message, function(
                response
            ) {
                callback(response);
            });
        }
    });
};
