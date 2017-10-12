/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "get-meta") {
        var title = document.querySelector("title").innerText;
        var url = document.location.href;
        var thumbUrl = "";

        //youtube
        if (document.querySelector("[itemprop='thumbnailUrl']")) {
            thumbUrl = document.querySelector("[itemprop='thumbnailUrl']").href;
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
