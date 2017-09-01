var $ = {};
$.x = function() {
    if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {}
    }
    return xhr;
};

$.send = function(url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = $.x();
    x.open(method, url, async);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            if (typeof callback == "function") {
                callback(x.responseText);
            }
        }
    };
    if (method == "POST") {
        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    x.send(data);
};

$.get = function(url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        );
    }
    $.send(
        url + (query.length ? "?" + query.join("&") : ""),
        callback,
        "GET",
        null,
        async
    );
};

$.post = function(url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        );
    }
    $.send(url, callback, "POST", query.join("&"), async);
};

var NEW_NOTIFICATION = false;
/**
 * @param  Update noticcation count of the extension
 * @return {[type]}
 */
var updateNotification = function(count) {
    count = count > 99 ? "99+" : count;
    chrome.browserAction.setBadgeText({ text: count.toString() });
};
/**
     * Retrieves site meta info
     * @param  {object}
     * @param  {Function} Callback function
     */
var retrieveSiteMeta = function(passed_message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, passed_message, function(
                response
            ) {
                callback(response);
            });
        }
    });
};

var countStore = 0;
var countData = { rows: [], pages: 0 };
var endpoint = "http://localhost:8000";

function checkStorage() {
    if (typeof localStorage.richNotification === "undefined") {
        localStorage.richNotification = 1;
    }
    if (typeof localStorage.sound === "undefined") {
        localStorage.sound = 1;
    }
    localStorage.theme = "dark";
}
/**
 * This function is being called by the popup to get the notication count
 * for various tabs
 * @param  {Function} Callback function
 */
var getNotifications = function(callback) {
    callback(countData);
};

var getTitle = function(linkCount, commentCount, word) {
    const getVerb = (count, word) => {
        return count > 1 ? word + "s" : word;
    };
    var msg = "You have got ";
    if (linkCount > 0) {
        msg += linkCount + " " + getVerb(linkCount, "link");
    }

    if (commentCount > 0) {
        if (linkCount > 0) {
            msg += " and ";
        }
        msg += commentCount + " " + getVerb(commentCount, "comment");
    }
    return msg;
};
//Start polling
setInterval(function() {
    checkStorage();
    if (chrome && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get("userid", function(items) {
            var userid = items.userid;
            var group = localStorage.getItem("defaultGroup");
            if (userid && group) {
                $.get(
                    endpoint,
                    {
                        group: group,
                        action: "getActivities",
                        bg: 1,
                        chrome_id: userid
                    },
                    function(response) {
                        var data = JSON.parse(response);
                        nData = data;
                        //data contains wallCount and updateCount
                        var totalCount = data.rows.length;
                        var views = chrome.extension.getViews({
                            type: "popup"
                        });

                        if (data.rows.length > 0 && views.length === 0) {
                            chrome.browserAction.setBadgeText({
                                text: totalCount.toString()
                            });

                            var sound = localStorage.sound;
                            var richNotification =
                                localStorage.richNotification;

                            if (sound !== null && sound == "1") {
                                var yourSound = new Audio(
                                    "public/sound/noti.mp3"
                                );
                                yourSound.play();
                            }

                            if (
                                richNotification !== null &&
                                richNotification == "1"
                            ) {
                                var itemList = [];
                                var linkCount = 0;
                                var commentCount = 0;

                                data.rows.forEach(activity => {
                                    var type = "link";
                                    if (activity.type == "link") {
                                        linkCount++;
                                    } else if (activity.type == "comment") {
                                        commentCount++;
                                    }
                                    var regex_clean = /<\/?[^>]+(>|$)/g;
                                    itemList.push({
                                        title: activity.template.replace(
                                            regex_clean,
                                            ""
                                        ),
                                        message: activity.type
                                    });
                                });
                                var title = getTitle(linkCount, commentCount);

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
                        localStorage.lastUpdateId = parseInt(data.lastUpdateId);
                    }
                );
            }
        });
    }
}, 10000);

var sendClickedStat = function(data) {
    $.post(endpoint, data);
};

window.nData = {};
chrome.notifications.onClicked.addListener(t => {
    window.open(nData.rows[0].url);
});

//update the version
var updateVersion = function() {
    var manifest = chrome.runtime.getManifest();
    var version = manifest.version;

    /* Sometimes due to some x bug, user gets loggedout. This will make them login automatically. */
    chrome.storage.sync.get("userid", function(response) {
        if (response.userid) {
            //user has logged in once. check if the user purposely logged-out
            if (localStorage.getItem("loggedOut") != "true") {
                //login the user
                $.get(
                    endpoint,
                    { chrome_id: response.userid, action: "fetchUserInfo" },
                    function(response) {
                        var result = JSON.parse(result);
                        if (typeof localStorage.chrome_id == "undefined") {
                            localStorage.nickname = result.data.nickname;
                            localStorage.loggedIn = true;
                            localStorage.chrome_id = response.userid;
                            localStorage.richNotification = 1;
                            localStorage.sound = 1;
                            localStorage.theme = "dark";
                            localStorage.uid = result.data.id;
                            localStorage.defaultGroup = 1;
                            localStorage.defaultGroupName = "Global";
                        }
                    }
                );
            }
        }
    });

    var chrome_id = localStorage.getItem("chrome_id");
    if (chrome_id !== null) {
        $.post(endpoint, {
            version: version,
            chrome_id: chrome_id,
            action: "updateUserVersion"
        });
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
