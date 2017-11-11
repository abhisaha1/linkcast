/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "get-meta") {
        var host = document.location.host;
        var title = ele("title").innerText;
        var url = document.location.href;
        var thumbUrl = "";

        if (host == "soundcloud.com") {
            Soundcloud.thumb(document.location.href);
        } else if (host == "www.youtube.com") {
            //youtube
            thumbUrl = Youtube.thumb(document.location.href, "small");
        } else if (ele("meta[property='og:image']")) {
            //facebook
            thumbUrl = ele("meta[property='og:image']").content;
        } else if (ele("link[rel='icon']")) {
            // default
            thumbUrl = ele("link[rel='icon']").href;
        }
        sendResponse({ title: title, url: url, thumbUrl: thumbUrl });
    }
});

var ele = function(selector) {
    return document.querySelector(selector);
};
var Youtube = (function() {
    "use strict";

    var video, results;

    var getThumb = function(url, size) {
        if (url === null) {
            return "";
        }
        size = size === null ? "big" : size;
        results = url.match("[\\?&]v=([^&#]*)");
        video = results === null ? url : results[1];

        if (size === "small") {
            return "http://img.youtube.com/vi/" + video + "/2.jpg";
        }
        return "http://img.youtube.com/vi/" + video + "/0.jpg";
    };

    return {
        thumb: getThumb
    };
})();

var Soundcloud = (function() {
    "use strict";
    var getThumb = function(url) {
        if (url === null) {
            return "";
        }
        //soundcloud
        let node = ele(
            "#content .listenArtworkWrapper .sc-artwork span.sc-artwork"
        );
        return window
            .getComputedStyle(node, false)
            .backgroundImage.slice(4, -1);
    };

    return {
        thumb: getThumb
    };
})();
