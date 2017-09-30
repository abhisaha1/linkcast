var auth = require("./auth");
var request = require("./request");
var user = require("./user");
var common = require("../common/common");
var _group = require("./group");

module.exports = new function() {
    this.page = 1;
    this.totalPages = 0;
    var bgPage = chrome.extension.getBackgroundPage();

    this.templates = {};

    this.getTemplate = name => {
        if (!this.templates[name]) {
            this.templates[name] = $("#" + name)
                .clone()
                .html();
        }
        if (!this.templates.wrapper) {
            this.templates.wrapper = $("#notification-wrapper")
                .clone()
                .html();
        }
        let wrapper = this.templates.wrapper;
        return wrapper.replace("{ITEM}", this.templates[name]);
    };

    this.getNotifications = () => {
        var group = localStorage.getItem("defaultGroup");
        auth.getUserId(chrome_id => {
            let params = {
                group: group,
                action: "getNotificationItems",
                chrome_id: chrome_id
            };
            let data = common.getDataString(params);
            request.get(data, data => {
                $("#loader").remove();
                this.totalPages = data.pages;

                var items = data.rows.map(item => {
                    let $html = this.getTemplate(item.type);
                    $html = $html.replace(/{(.*?)}/gi, function(variable) {
                        // convert {VAR} to VAR
                        variable = variable
                            .substring(1, variable.length - 1)
                            .toLowerCase();

                        if (variable == "created_at") {
                            return moment(item.created_at)
                                .add(moment().utcOffset(), "minutes")
                                .fromNow();
                        } else if (item[variable]) {
                            return item[variable];
                        } else {
                            return "";
                        }
                    });
                    return $html;
                });
                if (data.rows.length === 0) {
                    items = "No notifications yet.. But someday.";
                }
                $("#tab-notifications .items").html(items);
            });
        });
    };

    this.getItemMarkup = (data, uid) => {
        $("#loader").remove();
        this.totalPages = data.pages;

        var items = data.rows.map(item => {
            let $html = this.getTemplate(item.type);
            $html = $html.replace(/{(.*?)}/gi, function(variable) {
                // convert {VAR} to VAR
                variable = variable
                    .substring(1, variable.length - 1)
                    .toLowerCase();

                if (variable == "actors") {
                    if (item.type == "new_group") {
                        item.actors = item.nickname;
                    }
                    var actors = item[variable];
                    var arr = actors.split(",").map(actor => {
                        return "<span class='strong'>" + actor + "</span>";
                    });
                    var total = arr.length;

                    switch (total) {
                        case 1:
                            return arr[0];
                        case 2:
                            return arr.join(" and ");
                        case 3:
                            let others = arr[2];
                            return (
                                arr.splice(0, 2).join(", ") +
                                ` and <span class="strong ttip">1 other <span class="ttiptext">${others}</span></span>`
                            );
                        default: {
                            let others = arr.splice(2).join(", ");
                            return (
                                arr.splice(0, 2).join(", ") +
                                ` and <span class="strong ttip">${total -
                                    2} others <span class="ttiptext">${others}</span></span>`
                            );
                        }
                    }
                }
                if (variable == "title" && item.type != "linkcast") {
                    if (item[variable] && item[variable].length > 80) {
                        return item[variable].slice(0, 80) + "...";
                    }
                }
                if (variable == "hidejoin") {
                    let joined =
                        _group.groups.filter(
                            group => item.group_name == group.gname
                        ).length > 0;
                    if (joined) {
                        return "hide";
                    }
                }
                if (variable == "comment") {
                    if (item[variable] && item[variable].length > 60) {
                        return item[variable].slice(0, 60) + "...";
                    }
                }
                if (variable == "created_at") {
                    return moment(item.created_at)
                        .add(moment().utcOffset(), "minutes")
                        .fromNow();
                } else if (item[variable]) {
                    return item[variable];
                } else {
                    return "";
                }
            });
            return $html;
        });
        return items;
    };
}();
