import { request } from "./request";

export const doPost = (state, actions) => data => {
    state.post = Object.assign(state.post, data);
    state.post.posting = true;
    if (data.title.length == 0) {
        state.message = "Please enter a title";
        return actions.updateState(state);
    }
    if (data.url.length == 0) {
        state.message = "Please enter an url";
        return actions.updateState(state);
    }
    actions.updateState(state);
    data.action = "insertTrack";
    data.chrome_id = state.user.data.chrome_id;
    let params = {
        method: "POST",
        queryParams: data
    };
    request(params).then(result => {
        state.post.posting = false;
        state.groups.defaultGroup = data.group;
        state.mainNav.active = "feed";
        actions.fetchItems({ stateKey: "mainNav", tab_id: "feed" });
        actions.updateState(state);
    });
};

export const setPost = (state, actions) => data => {
    state.post = Object.assign(state.post, data);
    actions.updateState(state);
};

export const detectSite = (state, actions) => {
    if (chrome.tabs) {
        chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
            //var url = tabs[0].url;

            let payload = { action: "get-meta" };

            chrome.extension
                .getBackgroundPage()
                .retrieveSiteMeta(payload, data => {
                    if (data && data.url) {
                        state.post.title = data.title;
                        state.post.url = data.url;
                        state.post.thumbnail = data.thumbUrl;
                        actions.updateState(state);
                    }
                });
        });
    }
};
