import { request } from "./request";

export const doPost = (state, actions, data) => {
    return update => {
        state.post.posting = true;
        update(state);
        data.action = "insertTrack";
        data.chrome_id = state.chrome_id;
        let params = {
            method: "POST",
            queryParams: data
        };
        request(params).then(result => {
            state.post.posting = false;
            state.groups.defaultGroup = data.group;
            state.mainNav.active = "feed";
            actions.fetchItems({ stateKey: "mainNav", tab_id: "feed" });
            update(state);
        });
    };
};

export const detectSite = (state, actions) => {
    return update => {
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
                            update(state);
                        }
                    });
            });
        }
    };
};
