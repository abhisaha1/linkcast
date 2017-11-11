/******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/
            });
            /******/
        }
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module["default"];
                  }
                : /******/ function getModuleExports() {
                      return module;
                  };
        /******/ __webpack_require__.d(getter, "a", getter);
        /******/ return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = "src"; // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 205));
    /******/
})(
    /************************************************************************/
    /******/ {
        /***/ /***/ 2: function(module, exports, __webpack_require__) {
            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var queryParams = function queryParams(params) {
                var esc = encodeURIComponent;
                return Object.keys(params)
                    .map(function(k) {
                        return esc(k) + "=" + esc(params[k]);
                    })
                    .join("&");
            };

            var request = (exports.request = function request() {
                var options =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : {};

                var url = "http://localhost:8000";
                options = Object.assign(
                    {
                        credentials: "same-origin",
                        redirect: "error"
                    },
                    options
                );
                if (options.queryParams) {
                    if (options.method == "POST") {
                        options.headers = {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"
                        };

                        options.body = getFormData(options.queryParams);
                    } else {
                        url +=
                            (url.indexOf("?") === -1 ? "?" : "&") +
                            queryParams(options.queryParams);
                    }
                    delete options.queryParams;
                }
                return fetch(url, options).then(function(data) {
                    return data.json();
                });
            });

            var getFormData = function getFormData(params) {
                return Object.keys(params)
                    .map(function(key) {
                        return (
                            encodeURIComponent(key) +
                            "=" +
                            encodeURIComponent(params[key])
                        );
                    })
                    .join("&");
            };

            /***/
        },

        /***/ /***/ 205: function(module, exports, __webpack_require__) {
            "use strict";

            var _createClass = (function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(
                            target,
                            descriptor.key,
                            descriptor
                        );
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            var _request = __webpack_require__(2);

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var ExtensionBackground = (function() {
                function ExtensionBackground() {
                    _classCallCheck(this, ExtensionBackground);

                    this.events();
                }

                _createClass(ExtensionBackground, [
                    {
                        key: "events",
                        value: function events() {
                            var templates = {
                                link: "{POSTER} posted {TITLE} in {GROUP_NAME}",
                                like:
                                    "{NICKNAME} liked {POSTER}'s link - {TITLE}",
                                comment:
                                    "{NICKNAME} commented - {COMMENT} on {POSTER}'s link",
                                joined_group:
                                    "{NICKNAME} joined the group {GROUP_NAME}",
                                joined_linkcast: "{NICKNAME} joined Linkcast",
                                new_group:
                                    "{NICKNAME} created a new group - {GROUP_NAME}",
                                group_invite:
                                    "{NICKNAME} invited you to join {GROUP_NAME}",
                                group_invite_rejected:
                                    "{NICKNAME} rejected your invite to join {GROUP_NAME}",
                                request_private_group_join:
                                    "{NICKNAME} wants to join {GROUP_NAME}"
                            };
                            var NEW_NOTIFICATION = false;
                            /**
             * @param  Update noticcation count of the extension
             * @return {[type]}
             */
                            window.updateNotification = function(count) {
                                count = count > 99 ? "99+" : count;
                                chrome.browserAction.setBadgeText({
                                    text: count.toString()
                                });
                            };
                            /**
                 * Retrieves site meta info
                 * @param  {object}
                 * @param  {Function} Callback function
                 */
                            window.retrieveSiteMeta = function(
                                passed_message,
                                callback
                            ) {
                                chrome.tabs.query({ active: true }, function(
                                    tabs
                                ) {
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
                            window.countData = {
                                links: { rows: [] },
                                groups: { rows: [] }
                            };

                            function checkStorage() {
                                if (
                                    typeof localStorage.notification ===
                                    "undefined"
                                ) {
                                    localStorage.notification = 1;
                                }
                                if (typeof localStorage.sound === "undefined") {
                                    localStorage.sound = 1;
                                }
                                localStorage.theme = "dark";
                            }

                            var getTitle = function getTitle(
                                linkCount,
                                commentCount,
                                likeCount,
                                others
                            ) {
                                var getVerb = function getVerb(count, word) {
                                    return count > 1 ? word + "s" : word;
                                };
                                var totalNotifications =
                                    linkCount +
                                    commentCount +
                                    likeCount +
                                    others;
                                return (
                                    "You have got " +
                                    totalNotifications +
                                    " " +
                                    getVerb(totalNotifications, "notification")
                                );
                            };
                            var getFormatedText = function getFormatedText(
                                activity
                            ) {
                                //activity type
                                var type = activity.type;
                                var template = templates[type];
                                if (!template) {
                                    return "Couldn't decode the message. Maybe something very personal";
                                }
                                var text = template.replace(
                                    /{(.*?)}/gi,
                                    function(variable) {
                                        // convert {VAR} to VAR
                                        variable = variable
                                            .substring(1, variable.length - 1)
                                            .toLowerCase();

                                        return activity[variable];
                                    }
                                );
                                return text;
                            };
                            var getEmoji = function getEmoji(type) {
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
                                if (
                                    chrome &&
                                    chrome.storage &&
                                    chrome.storage.sync
                                ) {
                                    chrome.storage.sync.get("userid", function(
                                        items
                                    ) {
                                        var userid = items.userid;
                                        var group = localStorage.getItem(
                                            "defaultGroup"
                                        );
                                        if (userid && group) {
                                            var params = {
                                                queryParams: {
                                                    group: group,
                                                    action:
                                                        "getNotificatonUpdates",
                                                    chrome_id: userid
                                                }
                                            };
                                            (0, _request.request)(
                                                params
                                            ).then(function(data) {
                                                if (
                                                    data.lastUpdateId ==
                                                    countData.lastUpdateId
                                                ) {
                                                    return;
                                                }
                                                nData = data;
                                                //data contains link updates and group updates
                                                var totalCount = data.count;
                                                var views = chrome.extension.getViews(
                                                    {
                                                        type: "popup"
                                                    }
                                                );

                                                if (
                                                    data.count > 0 &&
                                                    views.length === 0
                                                ) {
                                                    chrome.browserAction.setBadgeText(
                                                        {
                                                            text: totalCount.toString()
                                                        }
                                                    );

                                                    var sound =
                                                        localStorage.sound;
                                                    var notification =
                                                        localStorage.notification;

                                                    if (
                                                        sound !== null &&
                                                        sound == "1"
                                                    ) {
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
                                                        data.links.rows.forEach(
                                                            function(activity) {
                                                                var type =
                                                                    "link";
                                                                if (
                                                                    activity.type ==
                                                                    "link"
                                                                ) {
                                                                    linkCount++;
                                                                } else if (
                                                                    activity.type ==
                                                                    "comment"
                                                                ) {
                                                                    commentCount++;
                                                                } else if (
                                                                    activity.type ==
                                                                    "like"
                                                                ) {
                                                                    likeCount++;
                                                                } else {
                                                                    others++;
                                                                }
                                                                var title = getFormatedText(
                                                                    activity
                                                                );
                                                                itemList.push({
                                                                    title: title,
                                                                    message: getEmoji(
                                                                        activity.type
                                                                    )
                                                                });
                                                            }
                                                        );

                                                        data.groups.rows.forEach(
                                                            function(activity) {
                                                                others++;
                                                                var title = getFormatedText(
                                                                    activity
                                                                );
                                                                itemList.push({
                                                                    title: title,
                                                                    message: getEmoji(
                                                                        activity.type
                                                                    )
                                                                });
                                                            }
                                                        );

                                                        var title = getTitle(
                                                            linkCount,
                                                            commentCount,
                                                            likeCount,
                                                            others
                                                        );

                                                        var options = {
                                                            type: "list",
                                                            message:
                                                                "New Links posted",
                                                            title: title,
                                                            iconUrl: chrome.runtime.getURL(
                                                                "public/icons/notification.png"
                                                            ),
                                                            items: itemList
                                                        };

                                                        if (
                                                            chrome.notifications
                                                        ) {
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
                            chrome.notifications.onClicked.addListener(function(
                                t
                            ) {
                                if (isset(nData.links.rows[0])) {
                                    window.open(nData.links.rows[0].url);
                                }
                            });

                            //update the version
                            window.updateVersion = function() {
                                var manifest = chrome.runtime.getManifest();
                                var version = manifest.version;

                                /* Sometimes due to some x bug, user gets loggedout. This will make them login automatically. */
                                chrome.storage.sync.get("userid", function(
                                    response
                                ) {
                                    if (response.userid) {
                                        //user has logged in once. check if the user purposely logged-out
                                        if (
                                            localStorage.getItem("loggedOut") !=
                                            "true"
                                        ) {
                                            //login the user
                                            var params = {
                                                queryParams: {
                                                    chrome_id: response.userid,
                                                    action: "fetchUserInfo"
                                                }
                                            };
                                            (0, _request.request)(
                                                params
                                            ).then(function(result) {
                                                if (
                                                    typeof localStorage.chrome_id ==
                                                    "undefined"
                                                ) {
                                                    localStorage.ACTORS =
                                                        result.data.ACTORS;
                                                    localStorage.loggedIn = true;
                                                    localStorage.chrome_id =
                                                        response.userid;
                                                    localStorage.notification = 1;
                                                    localStorage.sound = 1;
                                                    localStorage.theme = "dark";
                                                    localStorage.uid =
                                                        result.data.id;
                                                    localStorage.defaultGroup = 1;
                                                    localStorage.defaultGroupName =
                                                        "Global";
                                                }
                                            });
                                        }
                                    }
                                });

                                var chrome_id = localStorage.getItem(
                                    "chrome_id"
                                );
                                if (chrome_id !== null) {
                                    var params = {
                                        method: "POST",
                                        queryParams: {
                                            version: version,
                                            chrome_id: chrome_id,
                                            action: "updateUserVersion"
                                        }
                                    };
                                    (0, _request.request)(params);
                                }
                            };
                            /**
             * If the extension is installed or updated, update the version
             * in the server
             */
                            chrome.runtime.onInstalled.addListener(function(
                                details
                            ) {
                                updateVersion();
                            });

                            /**
             * Check for updates every 2 hours
             */
                            setInterval(function() {
                                if (
                                    chrome.runtime &&
                                    typeof chrome.runtime.requestUpdateCheck ===
                                        "function"
                                ) {
                                    chrome.runtime.requestUpdateCheck(
                                        function() {}
                                    );
                                }
                            }, 1000 * 3600 * 2);
                        }
                    }
                ]);

                return ExtensionBackground;
            })();

            new ExtensionBackground();

            /***/
        }

        /******/
    }
);
//# sourceMappingURL=background.js.map
