import { request } from "./request";

export const fetchNotifications = (state, actions) => tab_id => {
    let tab = state.notificationTabs.tabs[tab_id];

    let params = {
        queryParams: {
            handle: "tab-" + tab_id,
            page: 1,
            chrome_id: state.chrome_id,
            group: state.groups.defaultGroup,
            action: "readTracks",
            count: null
        }
    };
    if (tab.initialized) {
        params.queryParams.lastId = tab.data.rows[0].id;
    }
    request(params).then(result => {
        if (tab.initialized) {
            result.rows.length > 0 && tab.data.rows.unshift(result.rows);
        } else {
            result.page = tab.data.page;
            tab.data = result;
            tab.initialized = true;
        }
        tab.isFetching = false;
        state.notificationTabs.tabs[tab_id] = tab;
        actions.updateState(state);
    });
};

export const notificationClicked = (state, actions) => ({ active, index }) => {
    if (active == "notGroups") return;
    let item = state.notificationTabs.tabs[active].data.rows[index];
    let params = {
        queryParams: {
            handle: "itemId",
            chrome_id: state.chrome_id,
            group: item.group_id,
            action: "readTracks",
            item_id: item.item_id
        }
    };
    request(params).then(result => {
        state.modals.notification.open = true;
        state.modals.notification.title = result.rows[0].title;
        state.modals.notification.data = result;
        actions.updateState(state);
    });
};

export const setNotificationCount = (state, actions) => data => {
    state.notificationStatus = data;
    actions.updateState(state);
};

export const notificationJoinedGroup = (state, actions) => index => {
    state.notificationTabs.tabs.notGroups.data.rows[index].accepted = 1;
    actions.updateState(state);
};
