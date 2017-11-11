import { request } from "../lib/request";

class ExtensionBackground {
    constructor() {
        this.events();
    }

    events() {
        var templates = {
            link: "{POSTER} posted {TITLE} in {GROUP_NAME}",
            like: "{NICKNAME} liked {POSTER}'s link - {TITLE}",
            comment: "{NICKNAME} commented - {COMMENT} on {POSTER}'s link",
            joined_group: "{NICKNAME} joined the group {GROUP_NAME}",
            joined_linkcast: "{NICKNAME} joined Linkcast",
            new_group: "{NICKNAME} created a new group - {GROUP_NAME}",
            group_invite: "{NICKNAME} invited you to join {GROUP_NAME}",
            group_invite_rejected:
                "{NICKNAME} rejected your invite to join {GROUP_NAME}",
            request_private_group_join: "{NICKNAME} wants to join {GROUP_NAME}"
        };
        var NEW_NOTIFICATION = false;
        /**
         * @param  Update noticcation count of the extension
         * @return {[type]}
         */
        window.updateNotification = function(count) {
            count = count > 99 ? "99+" : count;
            chrome.browserAction.setBadgeText({ text: count.toString() });
        };
        /**
             * Retrieves site meta info
             * @param  {object}
             * @param  {Function} Callback function
             */
        window.retrieveSiteMeta = function(passed_message, callback) {
            chrome.tabs.query({ active: true }, function(tabs) {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        passed_message,
                        function(response) {
                            callback(response);
                        }
                    );
                }
            });
        };

        var countStore = 0;
        window.countData = { links: { rows: [] }, groups: { rows: [] } };

        function checkStorage() {
            if (typeof localStorage.notification === "undefined") {
                localStorage.notification = 1;
            }
            if (typeof localStorage.sound === "undefined") {
                localStorage.sound = 1;
            }
            localStorage.theme = "dark";
        }

        var getTitle = function(linkCount, commentCount, likeCount, others) {
            const getVerb = (count, word) => {
                return count > 1 ? word + "s" : word;
            };
            let totalNotifications =
                linkCount + commentCount + likeCount + others;
            return `You have got ${totalNotifications} ${getVerb(
                totalNotifications,
                "notification"
            )}`;
        };
        var getFormatedText = function(activity) {
            //activity type
            var type = activity.type;
            var template = templates[type];
            if (!template) {
                return "Couldn't decode the message. Maybe something very personal";
            }
            var text = template.replace(/{(.*?)}/gi, function(variable) {
                // convert {VAR} to VAR
                variable = variable
                    .substring(1, variable.length - 1)
                    .toLowerCase();

                return activity[variable];
            });
            return text;
        };
        var getEmoji = function(type) {
            switch (type) {
                case "like":
                    return "❤️";
                case "link":
                    return "🔗";
                case "comment":
                    return "🗣";
                case "joined_linkcast":
                    return "🙍🏻";
                case "joined_group":
                    return "👨‍👨‍👦‍👦";
                case "group_invite":
                    return "✉️";
                case "group_invite_rejected":
                    return "😏";
                case "linkcast":
                    return "📣";
                default:
                    return "";
            }
        };

        //Start polling
        setInterval(function() {
            checkStorage();
            if (!navigator.onLine) return false;
            if (chrome && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.get("userid", function(items) {
                    var userid = items.userid;
                    var group = localStorage.getItem("defaultGroup");
                    if (userid && group) {
                        let params = {
                            queryParams: {
                                group: group,
                                action: "getNotificatonUpdates",
                                chrome_id: userid
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

                            if (data.count > 0 && views.length === 0) {
                                chrome.browserAction.setBadgeText({
                                    text: totalCount.toString()
                                });

                                var sound = localStorage.sound;
                                var notification = localStorage.notification;

                                if (sound !== null && sound == "1") {
                                    var yourSound = new Audio(
                                        "public/sound/noti.mp3"
                                    );
                                    yourSound.play();
                                }

                                if (
                                    notification !== null &&
                                    notification == "1"
                                ) {
                                    var itemList = [];
                                    var linkCount = 0;
                                    var likeCount = 0;
                                    var commentCount = 0;
                                    var others = 0;
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
                            }
                            countData = data;
                            localStorage.lastUpdateId = parseInt(
                                data.lastUpdateId
                            );
                        });
                    }
                });
            }
        }, 10000);

        window.sendClickedStat = function(data) {
            $.post(endpoint, data);
        };

        window.nData = {};
        chrome.notifications.onClicked.addListener(t => {
            if (isset(nData.links.rows[0])) {
                window.open(nData.links.rows[0].url);
            }
        });

        //update the version
        window.updateVersion = function() {
            var manifest = chrome.runtime.getManifest();
            var version = manifest.version;

            /* Sometimes due to some x bug, user gets loggedout. This will make them login automatically. */
            chrome.storage.sync.get("userid", function(response) {
                if (response.userid) {
                    //user has logged in once. check if the user purposely logged-out
                    if (localStorage.getItem("loggedOut") != "true") {
                        //login the user
                        let params = {
                            queryParams: {
                                chrome_id: response.userid,
                                action: "fetchUserInfo"
                            }
                        };
                        request(params).then(result => {
                            if (typeof localStorage.chrome_id == "undefined") {
                                localStorage.ACTORS = result.data.ACTORS;
                                localStorage.loggedIn = true;
                                localStorage.chrome_id = response.userid;
                                localStorage.notification = 1;
                                localStorage.sound = 1;
                                localStorage.theme = "dark";
                                localStorage.uid = result.data.id;
                                localStorage.defaultGroup = 1;
                                localStorage.defaultGroupName = "Global";
                            }
                        });
                    }
                }
            });

            var chrome_id = localStorage.getItem("chrome_id");
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
        };
        /**
         * If the extension is installed or updated, update the version
         * in the server
         */
        chrome.runtime.onInstalled.addListener(function(details) {
            updateVersion();
        });

        /**
         * Check for updates every 2 hours
         */
        setInterval(function() {
            if (
                chrome.runtime &&
                typeof chrome.runtime.requestUpdateCheck === "function"
            ) {
                chrome.runtime.requestUpdateCheck(function() {});
            }
        }, 1000 * 3600 * 2);
    }
}

new ExtensionBackground();
