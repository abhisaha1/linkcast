export const onTabChange = (state, actions) => ({ stateKey, tab_id }) => {
    if (state[stateKey].tabs[tab_id].isFetching) {
        state[stateKey].tabs[tab_id].isFetching = true;
    }
    state.message = "";
    state[stateKey].active = tab_id;
    let params = { stateKey, tab_id };
    _gaq.push(["_trackPageview", "/" + state[stateKey].tabs[tab_id].name]);
    switch (tab_id) {
        case "notification":
            actions.onTabChange({
                stateKey: "notificationTabs",
                tab_id: state.notificationTabs.active
            });
            break;
        case "notLinks":
            actions.fetchNotifications(tab_id);
            break;
        case "notGroups":
            actions.fetchNotifications(tab_id);
            break;
        case "feed":
            actions.fetchItems(params);
            break;
        case "search":
            state[stateKey].tabs[tab_id].q = "";
            state[stateKey].tabs[tab_id].data = {
                rows: [],
                page: 1,
                pages: 0,
                total: 0
            };
            break;
        case "links":
            actions.onTabChange({
                stateKey: "linkTabs",
                tab_id: state.linkTabs.active
            });
            break;
        case "groups":
            actions.onTabChange({
                stateKey: "groupTabs",
                tab_id: state.groupTabs.active
            });
            break;
        case "favourites":
            actions.fetchItems(params);
            break;
        case "sent":
            actions.fetchItems(params);
            break;
        case "public":
            actions.fetchAllGroups(params);
            break;
        case "manage":
        //actions.fetchAllGroups(params);
    }

    actions.updateState(state);
};
