var auth = require("./auth");
var common = require("../common/common");
var request = require("./request");
var message = require("./message");
var storage = require("./storage");

module.exports = new function () {
    this.groups = [];
    (this.invites = []),
    (this.fetchGroups = callback => {
        auth.getUserId(chrome_id => {
            let params = {
                chrome_id: chrome_id,
                action: "fetchUserGroups"
            };
            var data = common.getDataString(params);
            var groups = {
                all: "<option value='0'>All</option>",
                withPostAccess: "",
                admin: ""
            };

            request.get(data, data => {
                var html = "<option value='0'>Select</option>";
                this.groups = data;
                data.forEach(item => {
                    let options = this.getGroupsTemplate(item);
                    if (item.group_rights == "can_post") {
                        groups.withPostAccess += options;
                    }
                    if (item.admin === item.uid) {
                        groups.admin += options;
                    }
                    groups.all += options;
                });
                $("#tab-feed #groups-dd").html(groups.all);
                $("#tab-post #groups-dd").html(groups.withPostAccess);
                $("#tab-groups #groups-dd").html(groups.admin);
                if (typeof callback == "function") {
                    callback();
                }
            });
        });
    });
    this.getGroupsTemplate = item => {
        var admin = false;
        var defaultGroup = storage.getItem("defaultGroup");
        var selected = defaultGroup === item.gid ? " selected " : "";
        var adminText = "";

        if (item.admin === item.uid) {
            adminText = "(admin)";
            admin = true;
        }
        return `<option
                        data-desc="${item.desc}"
                        is_public="${item.is_public}"
                        group_rights="${item.group_rights}"
                        admin-id="${item.admin}"
                        name="${item.gname}"
                        admin="${admin}"
                        ${selected}
                        value="${item.gid}"
                    >
                        ${item.gname}
                        ${adminText}
                    </option>`;
    };
    this.createEditGroup = e => {
        var mode = $(e.target).data("action");

        auth.getUserId(chrome_id => {
            var name = $(
                "#tab-groups .tab-pane.active #inputGroupCreate"
            ).val();
            var desc = $("#tab-groups .tab-pane.active  #inputGrpDesc").val();
            var group_password = $(
                "#tab-groups .tab-pane.active  #group-password"
            ).val();
            var is_public = $(
                "#tab-groups .tab-pane.active  #group-visibility .radio:checked"
            ).val();

            var params = {
                is_public: is_public,
                action: "createEditGroup",
                chrome_id: chrome_id,
                desc: desc,
                mode: mode,
                name: name,
                group_rights: $(
                    "#tab-groups .tab-pane.active  #group-rights .active input"
                ).val(),
                group_password: group_password
            };

            if (mode == "edit") {
                params.gid = $(
                    "#tab-groups .tab-pane.active  #groups-dd option:selected"
                ).val();
            }
            //if group is public, find other options
            if (is_public == "0" && (mode == "create" || mode == "edit")) {
                params.password = $(
                    "#tab-groups .tab-pane.active  #group-private #group-password"
                ).val();
                if (params.password.trim().length == 0) {
                    message.show("Please enter a password", "warning");
                    return;
                }
            }

            var data = common.getDataString(params);

            if (name == "") {
                message.show("Please enter a groupname. Noob!", "warning");
            } else if (desc == "") {
                message.show("Please enter a group description!", "warning");
            } else {
                request.post(data, data => {
                    if (data.flag) {
                        $("#tab-create-groups input").val("");
                        message.show(data.msg, "success");
                        this.fetchGroups(() => {
                            $("a[href='#tab-manage-groups']").click();
                            $(
                                `#tab-manage-groups #groups-dd option[value='${data.gid}']`
                            ).attr("selected", "selected");
                        });
                    } else {
                        message.show(data.msg, "warning");
                    }
                });
            }
        });
    };

    this.leaveGroup = e => {
        var $handle = $(e.target);
        var group_id = $handle.parents("tr").data("gid");

        auth.getUserId(chrome_id => {
            var params = {
                action: "leaveGroup",
                chrome_id: chrome_id,
                group_id: group_id
            };
            var data = common.getDataString(params);
            // check if the group exist. If yes, join the group
            request.post(data, data => {
                if (data.flag) {
                    $handle
                        .removeClass("group-leave red")
                        .addClass("group-join green")
                        .html("Join");
                    this.fetchGroups();
                    message.show(data.msg, "success");
                } else {
                    message.show(data.msg, "warning");
                }
            });
        });
    };
    this.joinPublicGroup = e => {
        e.preventDefault();
        var $handle = $(e.target);
        var group_id = $handle.parents(".group_row").data("gid");
        auth.getUserId(chrome_id => {
            var params = {
                action: "joinPublicGroup",
                chrome_id: chrome_id,
                group_id: group_id
            };
            var data = common.getDataString(params);
            // check if the group exist. If yes, join the group
            request.post(data, data => {
                if (data.flag) {
                    $handle
                        .removeClass("group-join green")
                        .addClass("group-leave red")
                        .html("Leave");
                    this.fetchGroups();
                    message.show(data.msg, "success");
                } else {
                    message.show(data.msg, "warning");
                }
            });
        });
    };
    this.joinPrivateGroup = () => {
        var group_name = $("#tab-private-groups #inputGroup").val();
        var group_password = $("#tab-private-groups #grpPwd").val();
        if (group_name != "") {
            auth.getUserId(chrome_id => {
                var params = {
                    action: "joinPrivateGroup",
                    chrome_id: chrome_id,
                    group_name: group_name,
                    group_password: group_password
                };
                var data = common.getDataString(params);
                // check if the group exist. If yes, join the group
                request.post(data, data => {
                    if (data.flag) {
                        $("#tab-private-groups input").val("");
                        this.fetchGroups();
                        message.show(data.msg, "success");
                    } else {
                        message.show(data.msg, "warning");
                    }
                });
            });
        } else {
            message.show("Enter a groupname. Noob!", "warning");
        }
    };
    this.makeGroupDefault = selector => {
        var defaultGroup = $(selector).val();
        var name = $(selector)
            .find("option:selected")
            .text();
        storage.setItem("defaultGroup", defaultGroup);
        storage.setItem("defaultGroupName", name);
        message.show("Default group set to " + name, "success");
        $("#group-display").html(storage.getItem("defaultGroupName"));
    };

    this.groupDDChanged = () => {
        var group_id = $("#tab-groups #groups-dd").val();
        //$(".editgroup-block").addClass("hide");
        var isAdmin = $("#tab-groups #groups-dd option:selected").attr("admin");
        var admin_id = $("#tab-groups #groups-dd option:selected").attr(
            "admin-id"
        );
        this.editGroup();
        if (isAdmin == "true") {
            //allow this fellow to edit the group
            $("#edit-group").removeClass("hide");
            $("#rename-group-input").val(
                $("#tab-manage-groups #groups-dd option:selected").attr("name")
            );
        } else {
            $("#edit-group").addClass("hide");
            $("#rename-group-input").val("");
        }
        $("#group-users-block").addClass("hide");
        $("#group-users-table tbody").html("");

        if (group_id != "0" && isAdmin == "true") {
            auth.getUserId(chrome_id => {
                let params = {
                    group: group_id,
                    chrome_id: chrome_id,
                    action: "getGroupUsers"
                };
                var data = common.getDataString(params);
                request.get(data, data => {
                    var html = "";
                    data.forEach((item, i) => {
                        var $html = $("#users-template")
                            .clone()
                            .find("tbody");
                        var remove = item.id == admin_id ? "" : "remove";
                        html += $html
                            .html()
                            .replace("{NICKNAME}", item.nickname)
                            .replace("{USER_ID}", item.id)
                            .replace("{REMOVE}", remove)
                            .replace("{" + item.group_rights + "}", "active")
                            .replace(new RegExp("{i}", "g"), i);
                    });
                    $("#group-users-table tbody").html(html);
                    $("#group-users-block").removeClass("hide");
                });
            });
        }
    };

    this.removeUserFromGroup = e => {
        var $handle = $(e.target).parents(".user-item");
        var user_id = $handle.data("id");
        var group_id = $("#tab-manage-groups #groups-dd").val();

        auth.getUserId(chrome_id => {
            var params = {
                user_id: user_id,
                group_id: group_id,
                action: "removeUserFromGroup",
                chrome_id: chrome_id
            };

            var data = common.getDataString(params);

            request.post(data, data => {
                if (data.flag) {
                    $handle.remove();
                    message.show(data.msg, "success");
                } else {
                    message.show(data.msg, "warning");
                }
            });
        });
    };
    /**
     * Prints instructions if the default group is not set.
     * This is usually seen if the user is not logged in
     */
    this.groupNotSetMessage = () => {
        if (typeof storage.getItem("defaultGroup") === "undefined") {
            $(
                "#tab-feed .items,#tab-notifications .items,#tab-favourites .items,#tab-sent .items"
            ).html(
                "<div id='instructions'>- Login/register to get started<br>- You will automatically be a part of Global group, where you can post links and mark them favourite. You can join public/private groups from Groups Tab. <br>- All links will be displayed in a tab called <b>Feed</b></div>"
            );
        }
    };

    this.getAllPublicGroups = () => {
        auth.getUserId(chrome_id => {
            var params = {
                chrome_id: chrome_id,
                action: "getAllPublicGroups"
            };
            var data = common.getDataString(params);

            request.get(data, data => {
                var html = "";
                data.forEach(item => {
                    var status =
                        item.status == "1" ?
                        "<a href='#' class='red group-leave'>Leave</a>" :
                        "<a href='#' class='green group-join'>Join</a>";
                    html += `<tr class="group_row" data-gid="${item.id}">
                                <td>
                                    <a href="#" class="group-name"><strong>${item.name}</strong></a>
                                </td>
                                <td>${item.desc}</td>
                                <td>
                                    ${item.group_rights}
                                </td>
                                <td>
                                    ${item.total}
                                </td>
                                <td>${status}</td>
                            </tr>`;
                });

                $("#tab-public-groups .items").html(html);
            });
        });
    };
    this.getUsers = (gid, user_id, callback) => {
        auth.getUserId(chrome_id => {
            var params = {
                chrome_id: chrome_id,
                group_id: gid,
                action: "getUsersOfGroup"
            };
            params = common.getDataString(params);

            request.get(params, data => {
                var users = data.map(
                    user =>
                    `<a href="#" data-id="${user.id}" class="username" style="color:${user.color}">${user.nickname}</a> - ${user.bio}`
                );
                var html = users.join("<br/> ");
                callback(html, data && data[0].name);
            });
        });
    };

    this.editGroup = e => {
        // $(e.target).addClass("hide");
        //$(".editgroup-block").removeClass("hide");
        var $markup = $("#create-group-block").clone(); //editgroup-block
        $markup.find("#create-group").remove();
        $markup = $markup[0].innerHTML.replace(
            /label-floating/g,
            "label-static"
        );
        $("div.editgroup-block #editgroup-wrapper")
            .html($markup)
            .removeClass("hide");

        let $handle = $("#editgroup-wrapper");
        let $option = $("#tab-manage-groups #groups-dd option:selected");

        //update group name
        $handle.find("#inputGroupCreate").val(
            $option
            .text()
            .replace("(admin)", "")
            .trim()
        );
        //update group desc
        $handle.find("#inputGrpDesc").val($option.data("desc"));
        //update private/public visibility
        $(
            "#tab-manage-groups #group-visibility .radio[value='" +
            $option.attr("is_public") +
            "']"
        ).click();
        //update public rights
        $(
            "#tab-manage-groups #group-rights .radio[value='" +
            $option.attr("group_rights") +
            "']"
        ).click();
    };
    this._editGroupSave = () => {
        var group_name = $("#rename-group-input").val();
        var group_id = $("#tab-manage-groups #groups-dd option:selected").val();

        auth.getUserId(chrome_id => {
            var params = {
                name: group_name,
                group_id: group_id,
                chrome_id: chrome_id,
                action: "editGroupSave"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                if (data.flag) {
                    $(".editgroup-block").addClass("hide");
                    message.show(data.msg, "success");
                    $("#edit-group").removeClass("hide");
                    $("#groups-dd option[value='" + group_id + "']").html(
                        group_name + "(admin)"
                    );

                    if (storage.getItem("defaultGroup") == group_id) {
                        storage.setItem(
                            "defaultGroupName",
                            group_name + "(admin)"
                        );
                        $("#group-display").html(group_name + "(admin)");
                    }
                } else {
                    //$("#edit-group").removeClass('hide');
                    message.show(data.msg, "warning");
                }
            });
        });
    };
    this.acceptInvite = e => {
        let $item = $(e.currentTarget).parents(".group_row");
        var $notificationItem = $(e.currentTarget).parents(
            ".notification-item"
        );

        auth.getUserId(chrome_id => {
            var params = {
                group_id: $item.data("gid"),
                activity_id: $item.data("aid"),
                chrome_id: chrome_id,
                action: "acceptGroupInvite"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                $notificationItem.remove();
                message.show(data.msg, "success");
            });
        });
    };

    this.rejectInvite = e => {
        let $item = $(e.currentTarget).parents(".group_row");
        var $notificationItem = $(e.currentTarget).parents(
            ".notification-item"
        );

        auth.getUserId(chrome_id => {
            var params = {
                group_id: $item.data("gid"),
                activity_id: $item.data("aid"),
                chrome_id: chrome_id,
                action: "rejectGroupInvite"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                $notificationItem.remove();
                message.show(data.msg, "success");
            });
        });
    };

    this.sendInvites = () => {
        let invites = this.invites.map(user => {
            return user.id;
        });
        auth.getUserId(chrome_id => {
            var params = {
                group_id: $("#invite-modal").attr("data-gid"),
                users: JSON.stringify(invites),
                chrome_id: chrome_id,
                action: "sendInvites"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                $("#invite-modal").modal("hide");
                message.show("Invites sent successfully.", "success");
            });
        });
    };

    this.inviteUsers = (e, resetInvites = true) => {
        let group_id = $(e.currentTarget).parents('.tab-pane').find('#groups-dd').val();
        $("#invite-modal")
            .attr("data-gid", group_id)
            .modal();
        auth.getUserId(chrome_id => {
            var params = {
                group_id: group_id,
                chrome_id: chrome_id,
                action: "getUsersToInvite"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                this.setInviteList(data.users, resetInvites);
                this.editInvites(data.invites);
            });
        });
    };
    this.editInvites = data => {
        let users = data.map(user => {
            return `<div class="invite"><span>${user.nickname}</span><span><a inviteId="${user.invite_id}" class="withdraw-invite" href="#">Withdraw</a></span></div>`;
        });
        let markup = users.join("");
        if (markup == "") {
            markup = "No pending invites...";
        }
        $("#sent-invites").html(markup);
    };
    this.setInviteList = (data, resetInvites) => {
        let dataClone = data;
        if (resetInvites) {
            this.invites = [];
        }
        const init = () => {
            dataClone = dataClone.sort((a, b) => {
                return b.nickname - a.nickname;
            });
            $(
                ".token-input-list-facebook, .token-input-dropdown-facebook"
            ).remove();
            $("#tags-input-send-invites").tokenInput(dataClone, {
                theme: "facebook",
                preventDuplicates: true,
                searchDelay: 0,
                propertyToSearch: "nickname",
                prePopulate: this.invites,
                resultsLimit: 5,
                debug: true,
                onAdd: user => {
                    dataClone = dataClone.filter(item => {
                        return item.id != user.id;
                    });
                    this.invites.push(user);
                    init();
                },
                onDelete: user => {
                    this.invites = this.invites.filter(item => {
                        return user.id !== item.id;
                    });
                    data.map(item => {
                        if (item.id == user.id) {
                            dataClone.push(item);
                            init();
                            return false;
                        }
                    });
                },
                onResult: function (results) {
                    var tagsearch = $(
                        "#token-input-tags-input-send-invites"
                    ).val();
                    return results.filter(item => {
                        return (
                            item.nickname
                            .toLowerCase()
                            .indexOf(tagsearch.toLowerCase()) === 0
                        );
                    });
                }
            });
            $("#token-input-tags-input-send-invites").focus();
        };
        init();
    };
    this.withrawInvite = e => {
        let inviteId = $(e.currentTarget).attr("inviteId");
        let group_id = $("#tab-manage-groups #groups-dd").val();
        let $item = $(e.currentTarget).parents(".invite");
        auth.getUserId(chrome_id => {
            var params = {
                group_id: group_id,
                invite_id: inviteId,
                chrome_id: chrome_id,
                action: "withdrawInvite"
            };
            params = common.getDataString(params);
            request.post(params, data => {
                $item.remove();
                this.inviteUsers(e, false);
            });
        });
    };
}();