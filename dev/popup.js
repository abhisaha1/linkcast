/* ========================================================================
 * @title - Share news, articles and music with your friends
 * @author - Abhishek Saha
 * @description - This is the main engine that takes care of everything
 * ======================================================================== */
window.$ = require("jquery");
window.jQuery = $;
require("bootstrap");
window.moment = require("moment");
require("./js/color-picker");
require("./js/jquery.tokeninput");

const storage = require("./js/popup/storage");
const request = require("./js/popup/request");
const common = require("./js/common/common");
const item = require("./js/popup/item");
const group = require("./js/popup/group");
const user = require("./js/popup/user");
const auth = require("./js/popup/auth");
const comments = require("./js/popup/comments");
const likes = require("./js/popup/likes");
const notification = require("./js/popup/notification");

var plugin = () => {
    /**
     * Private object containing the whole al =>ity of the plugin
     * @type {object}
     */
    var main = {
        /**
         * Holds the background page link
         * @type {String}
         */
        bgPage: null,

        /**
         * Future purpose
         * @type {Number}
         */
        edit: 0,

        /**
         * Timer to ping the background page for notifications
         * @type {Number}
         */
        noticationIntervalTimer: 0,

        /**
         * Start the engine
         * @return {null}
         */
        init: () => {
            //$.material.init();
            main.bgPage = chrome.extension.getBackgroundPage();
            main._addEventListeners();
            var manifest = chrome.runtime.getManifest();
            var version = manifest.version;
            $(".version").html(version);
            main.setTheme();

            user.userExist(result => {
                if (!result.flag) {
                    /* If user does not exist or not logged in show settings tab */
                    $('a[href="#tab-settings"]').click();
                    $("#loader").remove();
                    $(".authorized").addClass("hide");
                    /*The wall and update tab should show a message asking the user what to do*/
                    group.groupNotSetMessage();
                } else {
                    main._detectSite();
                    $(".authorized").removeClass("hide");

                    //check for email
                    user.checkEmailSet();
                    /* Trigger the first tab */
                    let tabId = $(".main-nav li.active a").attr("href");
                    item.fetchItems(tabId, "html", null);
                    group.fetchGroups();
                    main._activateScroll();
                    main._resetNotification();

                    /* If the user is logged in, show a welcome message */
                    user.welcomeUser(result.data.nickname);

                    /* Show which group the user is connected to */
                    $("#group-display").html(
                        storage.getItem("defaultGroupName")
                    );
                    $("#profile-color").spectrum({
                        preferredFormat: "hsl",
                        color: user.info.color
                    });

                    // main.noticationIntervalTimer = setInterval(
                    //     main._updateNotificationCount,
                    //     2000
                    // );
                }
            });
        },
        /**
         * Event listeners
         */
        _addEventListeners: () => {
            var self = main;

            $("#landing-login ").on("submit", self.loginUser);
            $("#landing-register ").on("submit", self.registerUser);
            $("#tab-create-groups #create-group").click(group.createEditGroup);
            $("#edit-group-save-btn").click(group.createEditGroup);
            $("#join-group").click(group.joinPrivateGroup);

            $("#post-btn").click(item.addItem);
            $("#default-group").click(() => {
                group.makeGroupDefault("#settings #groups-dd");
            });
            $("#change-email").click(e => {
                e.preventDefault();
                user.editUnverifiedEmail();
            });
            $(".email-btn").click(e => {
                var email = $("#add-email").val();
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(email)) {
                    //save it
                    user.saveEmail(email);
                }
            });
            $(document).on("click", ".favourite", item.makeFavourite);
            $(document).on("click", ".delete-item", item.deleteItem);
            $(document).on("click", ".comments-item", comments.showComments);
            $(document).on("click", ".item-link", item.itemClicked);
            $(document).on("click", ".likes-item", likes.likeClicked);
            $(document).on("click", ".forward-item", item.itemForward);
            $(document).on("click", ".item", e => {
                if (e.target.localName !== "div") {
                    return;
                }
                let link = $(e.target)
                    .parents(".item")
                    .find(".item-link")
                    .attr("href");
                window.open(link);
            });
            $("#tab-groups #groups-dd").on("change", group.groupDDChanged);
            $("#linkcast-web").click(function (e) {
                e.preventDefault();
                var link = `chrome-extension://${chrome.runtime.id}/popup.html`;
                window.open(link);
            });
            $(document).on("click", "a.link", e => {
                e.preventDefault();
                var item_id = $(e.currentTarget).data("id");
                item.getItem(item_id, user.info.id, (html, title) => {
                    $("#item-modal .items").html(html);
                    $("#item-modal .modal-title").html(title);
                    common.lazyLoadImages($("#item-modal .items .lazy"));
                    $("#item-modal").modal();
                });
            });
            $(document).on("click", ".profile-btn", e => {
                e.preventDefault();

                let data = {
                    nickname: $("#new-nickname").val(),
                    color: $("#profile-color").val(),
                    bio: $("#bio").val()
                };
                user.saveProfile(data, msg => {
                    console.log(msg);
                });
            });
            $(document).on("click", "a.withdraw-invite", group.withrawInvite);
            $(document).on("click", ".invite-btn", group.inviteUsers);
            $(document).on("click", "#send-invites", group.sendInvites);
            $(document).on("click", "a.group-accept", group.acceptInvite);
            $(document).on("click", "a.group-reject", group.rejectInvite);
            $(document).on("click", ".user-enabled .username", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var target_user_id = $(this).data("id");
                $("#profile-modal").modal();
                $("#profile-modal").attr("data-id", "");

                user.getProfile(target_user_id, user.info.id, res => {
                    $("#profile-modal .modal-title").html(
                        `<span style="color:${res.data.color}">${res.data
                            .nickname}</span> - ${res.data.bio}`
                    );
                    $("#profile-modal .groups-wrapper").html(
                        res.groups.join(", ")
                    );
                    $("#profile-modal").attr("data-id", target_user_id);
                });
                item.getOtherUserItems(
                    target_user_id,
                    user.info.id,
                    "html",
                    response => {}
                );
            });
            $(document).on("click", ".modal .username", e => {
                e.preventDefault();
            });
            $(document).on("click", "a.group-name", function (e) {
                e.preventDefault();
                let gid = $(this)
                    .parents("tr")
                    .data("gid");
                group.getUsers(gid, user.info.id, (html, gname) => {
                    $("#users-modal .modal-title").html(gname);
                    $("#users-modal .wrapper").html(html);
                    $("#users-modal").modal();
                });
            });
            $(document).on(
                "keyup",
                ".comment-input",
                comments.sendComment.bind(this)
            );

            $("#tab-feed #groups-dd").on("change", () => {
                group.makeGroupDefault("#tab-feed #groups-dd");
                item.fetchItems("#tab-feed", "html", null);
            });

            $('a[data-toggle="tab"],a[data-toggle="pill"]').on(
                "shown.bs.tab",
                self._tabChanged
            );

            //$("#edit-group").click(group.editGroup);
            // $("#edit-group-cancel-btn").click(() => {
            //     $("#edit-group").removeClass("hide");
            //     $(".editgroup-block").addClass("hide");
            // });
            $("#tab-profile").on("click", "#logout", auth.logout);
            $(document).on("click", "#group-visibility input", e => {
                var visibility = $(e.target).val();
                if (visibility == "0") {
                    $(".tab-pane.active #group-private").removeClass("hide");
                } else {
                    $(".tab-pane.active #group-private").addClass("hide");
                }
            });
            $("#tab-manage-groups").on(
                "click",
                ".remove-user",
                group.removeUserFromGroup
            );
            $("#tab-manage-groups").on(
                "click",
                ".user-item .btn-group .btn",
                user.changePublicRights
            );

            $(".tab-pane").on("click", ".group-join", group.joinPublicGroup);
            $("#tab-public-groups").on(
                "click",
                ".group-leave",
                group.leaveGroup
            );
            $("#tab-customize #sound-setting .btn").click(e => {
                storage.setItem(
                    "sound",
                    $(e.target)
                    .find(".radio")
                    .val()
                );
            });
            $("#tab-customize #theme-setting .btn").click(e => {
                storage.setItem(
                    "theme",
                    $(e.target)
                    .find(".radio")
                    .val()
                );
                self.setTheme();
            });
            $("#tab-customize #rich-notification .btn").click(e => {
                storage.setItem(
                    "richNotification",
                    $(e.target)
                    .find(".radio")
                    .val()
                );
            });
            // $("#tab-customize #sound-setting .radio").click(e => {
            //     storage.setItem("sound", $(e.target).val());
            // });
            /**
             * Not allowing user to update username.
             * Maybe a future release
             */
            // $("#settings").on('click','#edit-uname', () =>{
            //     $("#edit-name-block").removeClass('hide');
            // })

            // $("#update-uname-btn").click(self._updateUsername);
        },
        setTheme: () => {
            var theme = storage.getItem("theme");
            if (theme != null) {
                $("#theme").attr("href", "css/themes/" + theme + ".css");
                $("body")
                    .removeAttr("class")
                    .addClass(theme);
            }
        },

        /**
         * Triggers when a tab is changed
         * @param  {event}
         */
        _tabChanged: e => {
            e.preventDefault();
            var target = $(e.target).attr("href"); // activated tab
            item.page = 1;
            $("div.items").html(
                '<div id="loader" class="preloader"><img src="public/images/loader.svg"></div>'
            );

            user.userExist(result => {
                if (!result.flag) {
                    group.groupNotSetMessage();
                } else {
                    const targets = [
                        "#tab-notifications",
                        "#tab-feed",
                        "#updates",
                        "#comments",
                        "#user-links",
                        "#tab-favourites",
                        "#tab-links",
                        "#tab-sent"
                    ];
                    if (targets.indexOf(target) !== -1) {
                        //take care of sub tabs which are default
                        if (target === "#tab-links") {
                            target = $(target)
                                .find("li.active a")
                                .attr("href");
                        }
                        item.fetchItems(target, "html", null);
                    } else if (target === "#tab-groups") {
                        group.getAllPublicGroups();
                    } else if (target === "#tab-notifications") {
                        notification.getNotifications();
                    } else if (target === "#tab-about") {
                        main._getRandomQuote();
                    } else if (target === "#tab-post") {
                        $("#item-modal").modal("hide");
                    } else if (target === "#tab-manage-groups") {
                        group.editGroup();
                        $("#tab-groups #groups-dd").trigger("change");
                    } else if (target === "#tab-settings") {
                        group.fetchGroups();
                        var theme = storage.getItem("theme");
                        var sound = storage.getItem("sound");
                        var richNotification = storage.getItem(
                            "richNotification"
                        );
                        if (theme !== null) {
                            $(
                                "#theme-setting label[data-val='" + theme + "']"
                            ).click();
                        }
                        if (richNotification !== null) {
                            $(
                                "#rich-notification label[data-val='" +
                                richNotification +
                                "']"
                            ).click();
                        }
                        if (sound !== null) {
                            $(
                                "#sound-setting label[data-val='" + sound + "']"
                            ).click();
                        }
                    } else if (target === "#add-item") {
                        group.fetchGroups();
                    } else if (target === "#tab-public-groups") {
                        group.getAllPublicGroups();
                    } else if (target === "#tab-join-public-group") {
                        group.getAllPublicGroups();
                    }
                }
            });
        },

        /**
         * Detects if the active chrome tab is youtube or soudcloud
         */
        _detectSite: () => {
            chrome.tabs.query({
                currentWindow: true,
                active: true
            }, function (
                tabs
            ) {
                //var url = tabs[0].url;

                var payload = {
                    action: "get-meta"
                };

                main.bgPage.retrieveSiteMeta(payload, data => {
                    if (data && data.url) {
                        $("#item-name").val(data.title);
                        $("#item-url").val(data.url);
                        $("#item-thumb").val(data.thumbUrl);
                    }
                });
            });
        },
        /**
         * Reset the extension notification count to 0
         */
        _resetNotification: () => {
            auth.getUserId(chrome_id => {
                var group = storage.getItem("defaultGroup");

                if (group !== null) {
                    var params = {
                        group: group,
                        chrome_id: chrome_id,
                        action: "resetNotification"
                    };
                    var data = common.getDataString(params);
                    request.get(data);
                    main.bgPage.updateNotification(0);
                }
            });
        },
        /**
         * Update the notification count of the tabs
         */
        _updateNotificationCount: () => {
            main.bgPage.getNotificationCount(data => {
                let $html = $("#notification-template").clone();

                var items = data.rows.map(item => {
                    return $html
                        .html()
                        .replace("{ITEM_ID}", item.item_id)
                        .replace("{ITEM}", item.template)
                        .replace(
                            "{CREATED_AT}",
                            moment(item.created_at)
                            .add(moment().utcOffset(), "minutes")
                            .fromNow()
                        );
                });
                notification.fetchNotifications(
                    "#notifications",
                    "prepend",
                    null,
                    null
                );

                $("#notifications div.items").html(items);
            });
        },

        _activateScroll: () => {
            var $windows = $(
                "#tab-notifications .scroll, #tab-feed .scroll, #tab-sent .scroll, #tab-favourites .scroll, #user-links .panel-body"
            );

            $windows.scroll(function (e) {
                var height = $(this).innerHeight();
                var scroll_top = $(this).scrollTop();
                var scrollHeight = $(this)[0].scrollHeight;

                var loading = true;
                var window_id =
                    "#" +
                    $(this)
                    .parent()
                    .attr("id");
                if (scroll_top + height == scrollHeight && loading === true) {
                    item.page++;
                    if (item.page <= item.totalPages) {
                        $(".processor").show(); //toggleClass("hide");
                        item.fetchItems(window_id, "append", null, html => {
                            loading = false;
                            $(".processor").fadeOut(200); //.toggleClass("hide");
                        });
                    }
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            });

            $("#profile-modal .scroll").scroll(function (e) {
                var height = $(this).innerHeight();
                var scroll_top = $(this).scrollTop();
                var scrollHeight = $(this)[0].scrollHeight;

                var loading = true;
                if (scroll_top + height == scrollHeight && loading === true) {
                    item.userPage++;
                    if (item.userPage <= item.totalUserPages) {
                        item.getOtherUserItems(
                            $("#profile-modal").attr("data-id"),
                            user.info.id,
                            "append",
                            response => {
                                loading = false;
                            }
                        );
                    }
                }
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
        },

        /**
         * Register a new user.
         */
        registerUser: (e) => {
            e.preventDefault();
            auth.getUserId(chrome_id => {
                var params = {
                    chrome_id: chrome_id,
                    nickname: $("#r-nickname").val(),
                    password: $("#r-password").val(),
                    email: $("#r-email").val(),
                    action: "registerUser"
                };
                auth.register(params, response => {
                    user.info = response.data;
                    user.welcomeUser(params.nickname);
                    user.afterLogin(response.data);
                    main.bgPage.updateVersion();
                });
            });
        },
        /**
         * Login
         */
        loginUser: (e) => {
            e.preventDefault();
            auth.getUserId(chrome_id => {
                var params = {
                    chrome_id: chrome_id,
                    nickname: $("#nickname").val(),
                    password: $("#password").val(),
                    action: "loginUser"
                };
                auth.login(params, response => {
                    user.info = response.data;
                    user.welcomeUser(params.nickname);
                    user.afterLogin(response.data);
                    $("#profile-color").spectrum({
                        preferredFormat: "hsl",
                        color: user.info.color
                    });
                    main.bgPage.updateVersion();
                });
            });
        },
        _getRandomQuote: () => {
            var params = {
                action: "getQuote"
            };
            var data = common.getDataString(params);
            request.get(data, response => {
                $("#random_quote").html(
                    `<p class='ext-center'>${response.quote}<br/>&dash; ${response.author} &dash;</p>`
                );
            });
        }
    };

    return {
        init: main.init
    };
};

/**
 * Start the plugin
 */
var instance = plugin();
$(document).ready(instance.init);