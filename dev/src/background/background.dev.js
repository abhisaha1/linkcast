import { request } from "../lib/request";
import SiteMeta from "./SiteMeta";
import { getEmoji, getFormatedText, getTitle, checkStorage } from "./Utils";

class ExtensionBackground {
    constructor() {
        this.events();
        this.listeners();
    }
    events() {
        window.updateNotification = function(count) {
            count = count > 99 ? "99+" : count;
            chrome.browserAction.setBadgeText({ text: count.toString() });
        };
        window.retrieveSiteMeta = SiteMeta;
        window.countData = { links: { rows: [] }, groups: { rows: [] } };
        window.sendClickedStat = data => request(data);
        window.nData = {};

        //Start polling
        setInterval(() => {
            checkStorage();
            if (!navigator.onLine) return false;
            if (chrome && chrome.storage && chrome.storage.sync) {
                this.checkUpdates();
            }
        }, 10000);

        chrome.notifications.onClicked.addListener(t => {
            if (nData.links.rows.length > 0) {
                window.open(nData.links.rows[0].url);
            }
        });
    }

    checkUpdates() {
        chrome.storage.sync.get("userid", function(items) {
            var userid = items.userid;
            var group = localStorage.defaultGroup;
            if (!userid || !group) return false;
            var manifest = chrome.runtime.getManifest();
            var version = manifest.version;

            let params = {
                queryParams: {
                    group: group,
                    action: "getNotificatonUpdates",
                    chrome_id: userid,
                    version: version
                }
            };
            request(params).then(data => {
                if (data.lastUpdateId == countData.lastUpdateId) {
                    return;
                }
                nData = data;
                //data contains link updates and group updates
                var totalCount = data.count;
                var views = chrome.extension.getViews({
                    type: "popup"
                });
                countData = data;
                localStorage.lastUpdateId = parseInt(data.lastUpdateId);

                if (data.count === 0 || views.length != 0) return;

                chrome.browserAction.setBadgeText({
                    text: totalCount.toString()
                });

                var sound = localStorage.sound;
                var notification = localStorage.notification;

                if (sound !== null && sound == "1") {
                    var yourSound = new Audio("../public/sound/noti.mp3");
                    yourSound.play();
                }

                if (notification !== null && notification == "1") {
                    var itemList = [];
                    var linkCount = 0,
                        likeCount = 0,
                        commentCount = 0,
                        others = 0;
                    data.links.rows.forEach(activity => {
                        var type = "link";
                        if (activity.type == "link") {
                            linkCount++;
                        } else if (activity.type == "comment") {
                            commentCount++;
                        } else if (activity.type == "like") {
                            likeCount++;
                        } else {
                            others++;
                        }
                        var title = getFormatedText(activity);
                        itemList.push({
                            title: title,
                            message: getEmoji(activity.type)
                        });
                    });

                    data.groups.rows.forEach(activity => {
                        others++;
                        var title = getFormatedText(activity);
                        itemList.push({
                            title: title,
                            message: getEmoji(activity.type)
                        });
                    });

                    var title = getTitle(
                        linkCount,
                        commentCount,
                        likeCount,
                        others
                    );

                    var options = {
                        type: "list",
                        message: "New Links posted",
                        title: title,
                        iconUrl: chrome.runtime.getURL(
                            "public/icons/notification.png"
                        ),
                        items: itemList
                    };

                    if (chrome.notifications) {
                        chrome.notifications.create(
                            new Date().toString(),
                            options
                        );
                    }
                }
            });
        });
    }

    listeners() {
        /**
         * If the extension is installed or updated, update the version
         * in the server
         */
        chrome.runtime.onInstalled.addListener(details => {
            this.updateVersion();
        });
        /**
         * Check for updates every 2 hours
         */
        setInterval(() => {
            if (
                chrome.runtime &&
                typeof chrome.runtime.requestUpdateCheck === "function"
            ) {
                chrome.runtime.requestUpdateCheck(function() {});
            }
        }, 1000 * 3600 * 2);
    }

    updateVersion() {
        var manifest = chrome.runtime.getManifest();
        var version = manifest.version;
        var chrome_id = localStorage.chrome_id;
        if (chrome_id !== null) {
            let params = {
                method: "POST",
                queryParams: {
                    version: version,
                    chrome_id: chrome_id,
                    action: "updateUserVersion"
                }
            };
            request(params);
        }
    }
}

new ExtensionBackground();
