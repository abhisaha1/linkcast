import { request } from "../lib/request";
import { trigger } from "../lib/utils";

// fetch all groups of logged in user
export const fetchGroups = (state, actions) => callback => {
    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "fetchUserGroups"
        }
    };
    request(params).then(result => {
        const groupsData = result.map(group => {
            group.name = group.gname;
            delete group["gname"];
            return group;
        });
        actions.setGroups({
            action: "",
            payload: groupsData
        });
        if (typeof callback == "function") {
            callback();
        }
    });
};

// fetch all linkcast groups for a user to join.
export const fetchAllGroups = (state, actions) => () => {
    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "getAllGroups"
        }
    };
    request(params).then(result => {
        state.allGroups.isFetching = false;
        state.allGroups.data = result;
        actions.updateState(state);
    });
};

export const fetchGroupUsers = (state, actions) => e => {
    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "getGroupUsers",
            group: e.currentTarget.value
        }
    };
    request(params).then(result => {
        state.groupUsers.isFetching = false;
        state.groupUsers.data = result;
        state.groupUsers.group_id = e.target.value;
        state.groupUsers.admin_id =
            state.allGroups.data[e.target.options.selectedIndex].admin;
        actions.updateState(state);
    });
};

export const setGroups = (state, actions) => data => {
    state.groups.isFetching = false;
    data.payload.unshift({
        group_id: 0,
        name: "All"
    });
    state.groups.data = data.payload;
    state.groups.selected = data.payload[0] ? data.payload[0].id : null;
    actions.updateState(state);
};

export const setDefaultGroup = (state, actions) => index => {
    state.groups.defaultGroup = parseInt(state.groups.data[index].group_id);
    localStorage.defaultGroup = state.groups.defaultGroup;
    state.mainNav.tabs.feed.initialized = false;
    state.mainNav.tabs.feed.data = {
        rows: [],
        page: 1,
        pages: 0,
        total: 0
    };
    actions.fetchItems({ stateKey: "mainNav", tab_id: "feed" });
    state.message = "Default group set to " + state.groups.data[index].name;

    actions.updateState(state);
};

export const leaveGroup = (state, actions) => ({ e, key }) => {
    let group = state.allGroups.data[key];

    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "leaveGroup",
            group_id: group.id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            actions.fetchAllGroups();
            actions.fetchGroups();
            actions.fetchNotifications("notLinks");
        }
    });
};
export const joinGroup = (state, actions) => ({ group, callback }) => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: parseInt(group.is_public)
                ? "joinPublicGroup"
                : "joinPrivateGroupRequest",
            group_id: group.group_id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            actions.fetchAllGroups();
            actions.fetchGroups();
            actions.fetchNotifications("notLinks");
            if (typeof callback == "function") callback();
        }
    });
};

export const acceptGroupInvite = (state, actions) => ({
    e,
    index,
    activity
}) => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "acceptGroupInvite",
            group_id: activity.group_id,
            activity_id: activity.activity_id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            delete state.notificationTabs.tabs.notGroups.data.rows[index];
            actions.updateState(state);
        }
    });
};
export const rejectGroupInvite = (state, actions) => ({
    e,
    index,
    activity
}) => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "rejectGroupInvite",
            group_id: activity.group_id,
            activity_id: activity.activity_id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            delete state.notificationTabs.tabs.notGroups.data.rows[index];
            actions.updateState(state);
        }
    });
};
export const approveGroupRequest = (state, actions) => ({
    e,
    index,
    activity
}) => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "approveGroupRequest",
            group_id: activity.group_id,
            activity_id: activity.activity_id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            delete state.notificationTabs.tabs.notGroups.data.rows[index];
            actions.updateState(state);
        }
    });
};
export const rejectGroupRequest = (state, actions) => ({
    e,
    index,
    activity
}) => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "rejectGroupRequest",
            group_id: activity.group_id,
            activity_id: activity.activity_id
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            delete state.notificationTabs.tabs.notGroups.data.rows[index];
            actions.updateState(state);
        }
    });
};

export const saveEditedGroup = (state, actions) => data => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            is_public: data.is_public,
            action: "createEditGroup",
            desc: data.desc,
            mode: data.mode,
            name: data.name,
            group_id: data.id,
            group_rights: data.group_rights
        }
    };

    request(params).then(result => {
        state.message = result.msg;
        actions.updateState(state);
    });
};
export const changePublicRights = (state, actions) => data => {
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "changePublicRights",
            user_id: data.user_id,
            group_id: data.group_id,
            group_rights: data.group_rights
        }
    };

    request(params).then(result => {
        if (result.flag == 1) {
            state.groupUsers.data[data.index].group_rights = data.group_rights;
            state.message = result.msg;
            actions.updateState(state);
        }
    });
};
export const removeUserFromGroup = (state, actions) => data => {
    let user = state.groupUsers.data[data.index];
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            action: "removeUserFromGroup",
            user_id: user.id,
            group_id: data.group_id
        }
    };

    request(params).then(result => {
        if (result.flag == 1) {
            delete state.groupUsers.data[data.index];
            state.message = result.msg;
            actions.updateState(state);
        }
    });
};

export const createNewGroup = (state, actions) => data => {
    if (data.name.length == 0 || data.desc.length == 0) {
        state.message = "All fields are mandatory";
        actions.updateState(state);
    }

    let user = state.groupUsers.data[data.index];
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            is_public: data.is_public,
            action: "createEditGroup",
            desc: data.desc,
            mode: data.mode,
            name: data.name,
            group_rights: data.group_rights
        }
    };

    request(params).then(result => {
        state.message = result.msg;
        if (result.flag == 1) {
            state.groupTabs.active = "manage";
            actions.fetchAllGroups();
            actions.fetchGroups(() => {
                actions.updateState(state);
                document.querySelector(".manage-gdd").value = result.group_id;
                trigger(".manage-gdd", "change");
            });
            return false;
        }
        actions.updateState(state);
    });
};

// export const refreshGroup = (state, actions) => {

// }
