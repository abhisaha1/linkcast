const message = require("./message");
const auth = require("./auth");
const storage = require("./storage");
const request = require("./request");
const group = require("./group");
const common = require("../common/common");
const user = new function() {
    this.info = {};
    /**
     * Greets the user
     * @param  {String}
     */
    this.welcomeUser = nickname => {
        var logout = '<a href="#" id="logout">Logout</a>';
        $(".status").html(
            `Connected as <strong>${nickname}</strong>, ${logout}`
        );
        $("#new-nickname").val(nickname);
        $("#profile-color").val(this.info.color);
        $("#bio").val(this.info.bio);
        $(".step1").hide();
        $("#profile-color").spectrum({
            preferredFormat: "hsl",
            color: this.info.color
        });
    };
    /**
     * Some post processing after login/registration
     */
    this.afterLogin = data => {
        if (data.defaultGroup) {
            storage.setItem("defaultGroup", data.defaultGroup);
            storage.setItem("defaultGroupName", data.defaultGroupName);
            storage.setItem("uid", data.id);
            storage.setItem("chrome_id", data.chrome_id);

            $("#group-display").html(data.defaultGroupName);
            group.fetchGroups();
        }
    };
    /**
     * Updates username. But lets not allow user to do this.
     */
    this._updateUsername = e => {
        var nickname = $(e.target).val();
        if (name != "") {
            auth.getUserId(chrome_id => {
                var params = {
                    nickname: nickname,
                    action: "updateUsername",
                    chrome_id: chrome_id
                };

                var data = common.getDataString(params);
                request.get(data, data => {
                    if (data.flag) {
                        message.show(data.msg, "success");
                    } else {
                        message.show(data.msg, "warning");
                    }
                });
            });
        }
    };

    this.changePublicRights = e => {
        if ($(e.target).hasClass("active")) {
            return;
        }
        var $handle = $(e.target).parents(".user-item");
        var user_id = $handle.data("id");
        var group_id = $("#tab-manage-groups #groups-dd").val();
        var group_rights = $(e.target).find(".radio").val();

        auth.getUserId(chrome_id => {
            var params = {
                user_id: user_id,
                group_id: group_id,
                action: "changePublicRights",
                chrome_id: chrome_id,
                group_rights: group_rights
            };

            var data = common.getDataString(params);

            request.post(data, data => {
                if (data.flag) {
                    message.show(data.msg, "success");
                } else {
                    message.show(data.msg, "warning");
                }
            });
        });
    };

    this.saveProfile = (params, callback) => {
        auth.getUserId(chrome_id => {
            params.action = "saveProfile";
            params.chrome_id = chrome_id;

            var data = common.getDataString(params);

            request.post(data, response => {
                if (response.flag == 1) {
                    this.info.color = params.color;
                    this.info.bio = params.bio;
                    message.show(response.msg, "success");
                    storage.setItem("nickname", data.nickname);
                } else {
                    message.show(response.msg, "warning");
                }
                if (typeof callback == "function") {
                    callback();
                }
            });
        });
    };

    this.getProfile = (target_id, user_id, callback) => {
        auth.getUserId(chrome_id => {
            var params = {
                chrome_id: chrome_id,
                target_id: target_id,
                action: "getProfile"
            };

            var data = common.getDataString(params);

            request.get(data, response => {
                response.groups = response.groups.map(group => {
                    return `<span data-id="${group.id}" class="group-item">${group.name}</span>`;
                });
                callback(response);
            });
        });
    };
    /**
     * Check if the user exist.
     * @param  {Function} Callback function
     */
    this.userExist = callback => {
        var data = { flag: 0 };
        var loggedIn = storage.getItem("loggedIn");
        if (loggedIn !== "true") {
            callback(data);
        } else {
            //get the userid and check in the server
            auth.getUserId(chrome_id => {
                var params = {
                    chrome_id: chrome_id,
                    action: "fetchUserInfo"
                };

                var data = common.getDataString(params);

                request.get(data, response => {
                    this.info = response.data;
                    callback(response);
                });
            });
        }
    };

    this.checkEmailSet = () => {
        if (!this.info.email) {
            $(".no-confirm").hide();
            $(".no-email").show();
            $("#email-modal").modal();
        } else if (!parseInt(this.info.verified)) {
            $(".no-confirm").show();
            $(".no-email").hide();
            $("#email-modal").modal();
        } else {
            $("#email-modal").modal("hide");
        }
    };

    this.editUnverifiedEmail = () => {
        $(".no-email").show();
        $(".no-confirm").hide();
    };

    this.saveEmail = email => {
        auth.getUserId(chrome_id => {
            var params = {
                chrome_id: chrome_id,
                email: email,
                action: "saveEmail"
            };
            request.post(params, response => {
                //message.show("Done! Enjoy Linkcast", "success");
                user.info = response.data;
                user.checkEmailSet();
            });
        });
    };
}();

module.exports = user;
