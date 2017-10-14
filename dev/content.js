/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "get-meta") {
        var title = document.querySelector("title").innerText;
        var url = document.location.href;
        var thumbUrl = "";

        if (
            document.querySelector(
                ".listenArtworkWrapper .sc-artwork .sc-artwork-placeholder-8"
            )
        ) {
            //soundcloud
            thumbUrl = document
                .querySelector(
                    ".listenArtworkWrapper .sc-artwork .sc-artwork-placeholder-8"
                )
                .style.backgroundImage.slice(4, -1)
                .replace(/"/g, "");
        } else if (document.location.host == "www.youtube.com") {
            //youtube
            thumbUrl = Youtube.thumb(document.location.href, "small");
        } else if (document.querySelector("meta[property='og:image']")) {
            //facebook
            thumbUrl = document.querySelector("meta[property='og:image']")
                .content;
        } else if (document.querySelector("link[rel='icon']")) {
            // default
            thumbUrl = document.querySelector("link[rel='icon']").href;
        }
        sendResponse({ title: title, url: url, thumbUrl: thumbUrl });
    }
});

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
