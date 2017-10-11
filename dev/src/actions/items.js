import { request } from "./request";
import { deepFind, escape } from "./common";

export const fetchItems = (state, actions, { stateKey, tab_id, q }) => {
    let tab = state[stateKey].tabs[tab_id];
    if (tab.data.rows.length > 0) {
        return;
    }
    return update => {
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
        if (q) {
            params.queryParams.q = q;
            state[stateKey].tabs[tab_id].q = q;
        }
        request(params).then(result => {
            result.page = tab.data.page;
            tab.data = result;
            tab.isFetching = false;
            state[stateKey].tabs[tab_id] = tab;
            update(state);
        });
    };
};

export const loadMore = (state, actions, e) => {
    return update => {
        let modelStr = e.currentTarget.getAttribute("model");
        let tab = deepFind(state, modelStr);

        if (parseInt(tab.data.pages) < parseInt(tab.data.page)) {
            // enough.. dont fetch any more. because there is none.
            return;
        }

        let tabName = modelStr.split(".").pop();
        tab.loadMore = true;
        state[modelStr.split(".")[0]].tabs[tabName] = tab;
        update(state);
        let params = {
            queryParams: {
                chrome_id: state.chrome_id,
                group: state.groups.defaultGroup,
                action: "readTracks",
                handle: "tab-" + tabName,
                page: tab.data.page + 1,
                count: null
            }
        };
        if (tabName == "search") {
            params.queryParams.q = tab.q;
        }
        request(params).then(result => {
            tab.data.page++;
            tab.data.rows = tab.data.rows.concat(result.rows);
            tab.loadMore = false;
            state[modelStr.split(".")[0]].tabs[tabName] = tab;
            update(state);
        });
    };
};

export const fetchComments = (state, actions, { item, model, key }) => {
    return update => {
        let params = {
            queryParams: {
                commentsPage: 1,
                item_id: item.id,
                chrome_id: state.chrome_id,
                action: "commentsItem"
            }
        };
        request(params).then(result => {
            let [root] = model.split(".");
            item.commentList = result.rows;
            if (root == "modals") {
                state[root].notification.data.rows[key] = item;
            } else {
                state[root].tabs[state[root].active].data.rows[key] = item;
            }
            update(state);
        });
    };
};

export const handleFavourite = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    let favourite = parseInt(item.favourite);
    item.favourite = favourite ? 0 : 1;
    state.mainNav.tabs[state.mainNav.active].data.rows[key] = item;

    let params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: favourite ? "removeFromFavourite" : "addToFavourite"
        }
    };
    return update => {
        request(params).then(result => {
            if (result.flag) {
                update(state);
            }
        });
    };
};
export const handleLike = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    item.liked = parseInt(item.liked) ? 0 : 1;
    item.likes_count = parseInt(item.likes_count) + (item.liked ? 1 : -1);
    let [root] = model.split(".");
    if (root == "modals") {
        state[root].notification.data.rows[key] = item;
    } else {
        state[root].tabs[state[root].active].data.rows[key] = item;
    }
    let params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: "likeClicked"
        }
    };
    return update => {
        request(params).then(result => {
            if (result.flag) {
                update(state);
            }
        });
    };
};

export const showComments = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    item.showComments = 1;
    let [root] = model.split(".");
    if (root == "modals") {
        state[root].notification.data.rows[key] = item;
    } else {
        state[root].tabs[state[root].active].data.rows[key] = item;
    }
    actions.fetchComments({ item: item, model, key });

    return state;
};
export const handleShare = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    state.post.title = item.title;
    state.post.url = item.url;
    state.post.thumbnail = item.thumbnail;
    state.mainNav.active = "post";
    state.modals.notification.open = false;
    return state;
};
export const handleDelete = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    let [root] = model.split(".");
    if (root == "modals") {
        delete state[root].notification.data.rows[key];
        state[root].notification.open = false;
    } else {
        delete state[root].tabs[state[root].active].data.rows[key];
    }

    let params = {
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            action: "deleteItem"
        }
    };
    return update => {
        request(params).then(result => {
            if (result.flag) {
                update(state);
            }
        });
    };
};

export const handleCommentInput = (state, actions, { e, key }) => {
    if (e.keyCode != 13) return;
    let model = e.target.parentElement.closest("[model]").model;
    let comment = e.target.value;
    let item = deepFind(state, model).data.rows[key];
    let [root] = model.split(".");

    if (!item.commentList) {
        item.commentList = [];
    }
    e.target.value = "";
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.chrome_id,
            item_id: item.id,
            comment: comment,
            action: "insertComment"
        }
    };
    return update => {
        request(params).then(result => {
            if (result.flag == 1) {
                let newComment = {
                    color: state.user.data.color,
                    comment: escape(comment),
                    created_at: "now",
                    id: result.id,
                    item_id: item.id,
                    nickname: state.user.data.nickname,
                    user_id: state.user.data.id
                };
                if (root == "modals") {
                    state[root].notification.data.rows[key].commentList.unshift(
                        newComment
                    );
                } else {
                    state[root].tabs[state[root].active].data.rows[
                        key
                    ].commentList.unshift(newComment);
                }
                update(state);
            }
        });
    };
};

export const itemClicked = (state, actions, { e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    let [root] = model.split(".");
    if (item.uid != state.user.data.id) {
        let count = parseInt(item.times_clicked) + 1;
        if (root == "modals") {
            state[root].notification.data.rows[key].times_clicked = count;
        } else {
            state[root].tabs[state[root].active].data.rows[
                key
            ].times_clicked = count;
        }
    }
    let params = {
        chrome_id: state.chrome_id,
        item_id: item.id,
        action: "itemClicked"
    };
    if (chrome.extension) {
        var bgPage = chrome.extension.getBackgroundPage();
        bgPage.sendClickedStat(params);
    }
    window.open(e.target.href);
    return state;
};

export const lazyLoad = (state, actions, { e, image }) => {
    let ele = document.createElement("img");
    ele.src = image;
    ele.onload = () => {
        e.src = image;
    };
};
