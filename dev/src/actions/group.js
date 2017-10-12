import { request } from "./request";
export const fetchGroups = (state, actions, tab_id) => {
    let params = {
        queryParams: {
            chrome_id: state.chrome_id,
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
    });
};

export const fetchAllGroups = (state, actions, tab_id) => {
    return update => {
        let params = {
            queryParams: {
                chrome_id: state.chrome_id,
                action: "getAllGroups"
            }
        };
        request(params).then(result => {
            state.allGroups.isFetching = false;
            state.allGroups.data = result;
            update(state);
        });
    };
};

export const fetchGroupUsers = (state, actions, e) => {
    return update => {
        let params = {
            queryParams: {
                chrome_id: state.chrome_id,
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
            update(state);
        });
    };
};

export const setGroups = (state, actions, data) => {
    state.groups.isFetching = false;
    state.groups.data = data.payload;
    return state;
};

export const setDefaultGroup = (state, actions, index) => {
    state.groups.defaultGroup = parseInt(state.groups.data[index].group_id);
    localStorage.defaultGroup = state.groups.defaultGroup;
    state.mainNav.tabs.feed.data = {
        rows: [],
        page: 1,
        pages: 0,
        total: 0
    };
    actions.fetchItems({ stateKey: "mainNav", tab_id: "feed" });
    state.message = "Default group set to " + state.groups.data[index].name;

    return state;
};

export const leaveGroup = (state, actions, { e, key }) => {
    let group = state.allGroups.data[key];
    return update => {
        let params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "leaveGroup",
                group_id: group.id
            }
        };
        request(params).then(result => {
            if (result.flag == 1) {
                actions.fetchAllGroups();
            }
        });
    };
};
export const joinGroup = (state, actions, { group, callback }) => {
    return update => {
        let params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: parseInt(group.is_public)
                    ? "joinPublicGroup"
                    : "joinPrivateGroupRequest",
                group_id: group.group_id
            }
        };
        request(params).then(result => {
            if (result.flag == 1) {
                actions.fetchAllGroups();
                if (typeof callback == "function") callback();
            }
        });
    };
};

export const acceptGroupInvite = (state, actions, { e, index, activity }) => {
    return update => {
        let params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "acceptGroupInvite",
                group_id: activity.group_id,
                activity_id: activity.activity_id
            }
        };
        request(params).then(result => {
            if (result.flag == 1) {
                delete state.notificationTabs.tabs.notGroups.data.rows[index];
                update(state);
            }
        });
    };
};
export const rejectGroupInvite = (state, actions, { e, index, activity }) => {
    return update => {
        let params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                action: "rejectGroupInvite",
                group_id: activity.group_id,
                activity_id: activity.activity_id
            }
        };
        request(params).then(result => {
            if (result.flag == 1) {
                delete state.notificationTabs.tabs.notGroups.data.rows[index];
                update(state);
            }
        });
    };
};

export const saveEditedGroup = (state, actions, data) => {
    return update => {
        let params = {
            method: "POST",
            queryParams: {
                chrome_id: state.chrome_id,
                is_public: data.is_public,
                action: "createEditGroup",
                desc: data.desc,
                mode: data.mode,
                name: data.name,
                group_id: data.id,
                group_rights: data.group_rights,
                group_password: data.group_password
            }
        };

        request(params).then(result => {
            if (result.flag == 1) {
                state.message = result.msg;
                update(state);
            }
        });
    };
};
