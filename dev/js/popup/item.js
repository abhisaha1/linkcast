const request = require("./request");
const storage = require("./storage");
const auth = require("./auth");
const common = require("../common/common");
const message = require("./message");
const _group = require("./group");

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};

module.exports = new function() {
    /**
     * Holds the current page number
     * @type {Number}
     */
    this.page = 1;

    this.userPage = 1;
    this.totalUserPages = 0;
    /**
     * Total number of pages available
     * @type {Number}
     */
    this.totalPages = 0;

    /**
     * Fetch items from the server
     * @param  {Int} Current Page
     * @param  {String} Determines active tab
     * @param  {Function} Callback function
     * @param  {String} Determines if the items needs to be appended or prepended or pasted
     * @param  {Number} Total items to fetch
     */
    this.fetchItems = (handle, updateType, count, callback) => {
        var group = storage.getItem("defaultGroup");
        if (group) {
            auth.getUserId(chrome_id => {
                var uid = storage.getItem("uid");
                const params = {
                    count: count,
                    handle: handle.replace("#", ""),
                    page: this.page,
                    chrome_id: chrome_id,
                    group: group,
                    action: "readTracks"
                };
                let data = common.getDataString(params);
                request.get(data, data => {
                    $("#loader").remove();

                    this.totalPages = data.pages;

                    if (data.rows.length === 0) {
                        html = "Nothing found.";
                    }

                    var html = this.getItemMarkup(handle, data, uid);

                    if (updateType === "append") {
                        $(handle + " div.items").append(html);
                    } else if (updateType === "prepend") {
                        $(handle + " div.items").prepend(html);
                    } else if (updateType === "html") {
                        $(handle + " div.items").html(html);
                    }
                    common.lazyLoadImages($(handle + " div.items .lazy"));

                    if (typeof callback === "function") {
                        callback(html);
                    }
                });
            });
        }
    };
    this.getOtherUserItems = (
        target_user_id,
        user_id,
        updateType,
        callback
    ) => {
        auth.getUserId(chrome_id => {
            const params = {
                count: 5,
                page: this.userPage,
                chrome_id: chrome_id,
                target_id: target_user_id,
                action: "getOtherUserTracks"
            };
            let data = common.getDataString(params);
            request.get(data, data => {
                $("#loader").remove();
                var uid = storage.getItem("uid");
                this.totalUserPages = data.pages;

                if (data.rows.length === 0) {
                    html = "Nothing found.";
                }

                var html = this.getItemMarkup("#profile-modal", data, uid);

                if (updateType === "append") {
                    $("#profile-modal div.items").append(html);
                } else if (updateType === "prepend") {
                    $("#profile-modal div.items").prepend(html);
                } else if (updateType === "html") {
                    $("#profile-modal div.items").html(html);
                }
                common.lazyLoadImages($("#profile-modal div.items .lazy"));

                if (typeof callback === "function") {
                    callback(html);
                }
            });
        });
    };

    this.getItem = (item_id, uid, callback) => {
        var group = storage.getItem("defaultGroup");
        if (group) {
            auth.getUserId(chrome_id => {
                const params = {
                    handle: "itemId",
                    chrome_id: chrome_id,
                    group: group,
                    item_id: item_id,
                    action: "readTracks"
                };
                let data = common.getDataString(params);
                request.get(data, items => {
                    if (items.length === 0) {
                        //some problem occured.
                    } else {
                        var html = this.getItemMarkup(
                            "notification",
                            items,
                            uid
                        );
                        if (typeof callback == "function") {
                            callback(html, items.rows[0].title);
                        }
                    }
                });
            });
        }
    };
    this.timeAgo = time => {
        let timeStr = moment(time)
            .add(moment().utcOffset(), "minutes")
            .fromNow();

        return timeStr.replaceArray(
            [
                " years",
                "a year",
                " months",
                "a month",
                " days",
                "a day",
                " hours",
                " an hour",
                " minutes",
                "a minute",
                " seconds",
                " second"
            ],
            ["y", "1y", "m", "1m", "d", "1d", "h", "h", "min", "1min", "s", "s"]
        );
    };
    this.getItemMarkup = (handle, data, uid) => {
        var html = "";
        var existingItemsCount = $(handle + " .item").length;
        data.rows.forEach((item, idx) => {
            let $html = $("#item-template").clone();

            let comments = item.comments === null ? "" : item.comments;

            let thumbnail = item.thumbnail;

            if (item.thumbnail == "" || item.thumbnail == null) {
                thumbnail = "public/images/weed.jpg";
            }

            var gname = localStorage.defaultGroup != 0 ? "" : item.gname;

            var favourite =
                item.favourite == "1"
                    ? "glyphicon-star"
                    : "glyphicon-star-empty";

            var deleteBtn = item.uid == uid ? "Delete" : "";

            var item = $html
                .html()
                .replace("{NICKNAME}", common.escape(item.nickname))
                .replace("{SRNO}", ++existingItemsCount)
                .replace("{STAR}", favourite)
                .replace("{THUMB}", thumbnail)
                .replace("{ITEM_ID}", item.id)
                .replace(/{USER_ID}/g, item.uid)
                .replace("{TITLE}", common.escape(item.title))
                .replace(/{URL}/g, common.escape(item.url))
                .replace("{COMMENTS}", comments)
                .replace("{GROUP_NAME}", common.escape(gname))
                .replace("{GROUP_ID}", gname)
                .replace("{DELETE}", deleteBtn)
                .replace(
                    "{COMMENT_ICON}",
                    item.comments_count > 0 ? "comments" : "comment-o"
                )
                .replace("{COMMENTS_COUNT}", item.comments_count)
                .replace("{LIKE_ICON}", item.liked == 1 ? "heart" : "heart-o")
                .replace("{COLOR}", item.color)
                .replace("{TIMES_CLICKED}", item.times_clicked)
                .replace("{LIKES_COUNT}", item.likes_count)
                .replace("{LIKED}", item.liked)
                .replace("{CREATED_AT}", this.timeAgo(item.created_at));
            html += item;
        });
        return html;
    };
    /**
     * Publish a new Item
     */
    this.addItem = () => {
        var title = $("#item-name").val();
        var url = $("#item-url").val();
        var thumbnail = $("#item-thumb").val();
        var comments = $("#item-comments").val();
        var group = $("#tab-post #groups-dd").val();
        var flag = 1;

        //Validations
        if (url == "") {
            message.show("Enter a valid URL", "warning");
            flag = 0;
        }

        if (flag === 1 && title == "") {
            message.show("Enter a Title", "warning");
            flag = 0;
        }

        if (flag === 1) {
            if (group && group != "0") {
                auth.getUserId(function(chrome_id) {
                    var params = {
                        thumbnail: thumbnail,
                        comments: comments,
                        title: title,
                        url: url,
                        group: group,
                        chrome_id: chrome_id,
                        action: "insertTrack"
                    };
                    var data = common.getDataString(params);

                    request.post(data, function(data) {
                        if (data.flag) {
                            _group.makeGroupDefault("#tab-post #groups-dd");
                            $('a[href="#tab-feed"]').click();
                            $("#tab-post input").val("");
                        } else {
                            message.show(data.msg, "warning");
                        }
                    });
                });
            } else {
                message.show(
                    "Select a group as default from Settings",
                    "warning"
                );
            }
        }
    };

    this.itemClicked = e => {
        e.preventDefault();
        e.stopPropagation();
        var $handle = $(e.target).parents(".item");
        var item_id = $handle.attr("data-id");

        auth.getUserId(function(chrome_id) {
            var params = {
                chrome_id: chrome_id,
                action: "itemClicked",
                item_id: item_id
            };
            var bgPage = chrome.extension.getBackgroundPage();
            bgPage.sendClickedStat(params);
            window.open($(e.target).attr("href"));
        });
    };

    this.itemForward = e => {
        var $handle = $(e.target).parents(".item");
        var url = $handle.find(".item-link").attr("href");
        var title = $handle.find(".item-link").text();

        $('a[href="#tab-post"]').click();
        $("#tab-post #item-name").val(title);
        $("#tab-post #item-url").val(url);
        setTimeout(() => $("#tab-post #item-comments").focus(), 0);
    };

    this.deleteItem = e => {
        var $handle = $(e.target).parents(".item");
        var item_id = $handle.data("id");

        auth.getUserId(chrome_id => {
            var params = {
                item_id: item_id,
                chrome_id: chrome_id,
                action: "deleteItem"
            };
            var data = common.getDataString(params);
            request.post(data, data => {
                if (data.flag) {
                    $handle.remove();
                } else {
                }
            });
        });
    };
    /**
     * Make the item your favourite
     */
    this.makeFavourite = e => {
        var $handle = $(e.target);
        var item_id = $handle.parents(".item").data("id");

        auth.getUserId(function(chrome_id) {
            var action = "addToFavourite";
            var newClass = "glyphicon-star";

            if ($handle.hasClass("glyphicon-star")) {
                action = "removeFromFavourite";
                newClass = "glyphicon-star-empty";
            }
            var params = {
                chrome_id: chrome_id,
                item_id: item_id,
                action: action
            };
            var data = common.getDataString(params);
            request.post(data, data => {
                $('.item[data-id="' + item_id + '"] .favourite')
                    .removeClass("glyphicon-star glyphicon-star-empty")
                    .addClass(newClass);
            });
        });
    };
}();
