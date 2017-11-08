import { request } from "./request";
import { deepFind, escape } from "./common";

export const fetchItems = (state, actions) => ({ stateKey, tab_id, q }) => {
    let tab = state[stateKey].tabs[tab_id];
    if (tab_id == "search") {
        tab.data.rows = [];
    }
    let params = {
        queryParams: {
            handle: "tab-" + tab_id,
            page: 1,
            chrome_id: state.user.data.chrome_id,
            group: state.groups.defaultGroup,
            action: "readTracks",
            count: null
        }
    };
    if (q) {
        tab.initialized = false;
        params.queryParams.q = q;
        state[stateKey].tabs[tab_id].q = q;
        _gaq.push(["_trackEvent", q, "searched"]);
    }
    if (tab.initialized && tab.data.rows.length > 0) {
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
        state[stateKey].tabs[tab_id] = tab;
        actions.updateState(state);
    });
};

export const loadMore = (state, actions) => e => {
    let modelStr = e.currentTarget.getAttribute("model");
    let tab = deepFind(state, modelStr);

    if (parseInt(tab.data.pages) < parseInt(tab.data.page)) {
        // enough.. dont fetch any more. because there is none.
        return;
    }

    let tabName = modelStr.split(".").pop();
    tab.loadMore = true;
    state[modelStr.split(".")[0]].tabs[tabName] = tab;
    actions.updateState(state);
    const $preloader = document.querySelector(".preloader");
    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
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
    $preloader.classList.remove("invisible");
    request(params).then(result => {
        tab.data.page++;
        tab.data.rows = tab.data.rows.concat(result.rows);
        tab.loadMore = false;
        state[modelStr.split(".")[0]].tabs[tabName] = tab;
        actions.updateState(state);
        setTimeout(() => $preloader.classList.add("invisible"), 0);
    });
};

export const fetchComments = (state, actions) => ({ item, model, key }) => {
    let params = {
        queryParams: {
            commentsPage: 1,
            item_id: item.id,
            chrome_id: state.user.data.chrome_id,
            action: "commentsItem"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "comments"]);
    request(params).then(result => {
        let [root] = model.split(".");
        item.commentList = result.rows;
        if (root == "modals") {
            state[root].notification.data.rows[key] = item;
        } else {
            state[root].tabs[state[root].active].data.rows[key] = item;
        }
        actions.updateState(state);
    });
};

export const handleFavourite = (state, actions) => ({ e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    let favourite = parseInt(item.favourite);
    item.favourite = favourite ? 0 : 1;
    let [root] = model.split(".");
    if (root == "modals") {
        state[root].notification.data.rows[key] = item;
    } else {
        state[root].tabs[state[root].active].data.rows[key] = item;
    }
    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            item_id: item.id,
            action: favourite ? "removeFromFavourite" : "addToFavourite"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "favourite"]);
    request(params).then(result => {
        if (result.flag) {
            actions.updateState(state);
        }
    });
};
export const handleLike = (state, actions) => ({ e, key }) => {
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
            chrome_id: state.user.data.chrome_id,
            item_id: item.id,
            action: "likeClicked"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "like"]);
    request(params).then(result => {
        if (result.flag) {
            actions.updateState(state);
        }
    });
};

export const showComments = (state, actions) => ({ e, key }) => {
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

    actions.updateState(state);
};
export const handleShare = (state, actions) => ({ e, key }) => {
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    state.post.title = item.title;
    state.post.url = item.url;
    state.post.thumbnail = item.thumbnail;
    state.mainNav.active = "post";
    state.modals.notification.open = false;
    _gaq.push(["_trackEvent", "clicked", "share"]);
    actions.updateState(state);
};
export const handleDelete = (state, actions) => ({ e, key }) => {
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
            chrome_id: state.user.data.chrome_id,
            item_id: item.id,
            action: "deleteItem"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "delete"]);
    request(params).then(result => {
        if (result.flag) {
            actions.updateState(state);
        }
    });
};

export const handleCommentInput = (state, actions) => ({ e, key }) => {
    if (e.keyCode != 13) return;
    let comment = e.target.value;
    // if edit comment then cancel this process
    if (state.editComment.open) {
        actions.saveEditedComment(comment);
        actions.updateState(state);
    }
    let model = e.target.parentElement.closest("[model]").model;
    let item = deepFind(state, model).data.rows[key];
    let [root] = model.split(".");

    if (!item.commentList) {
        item.commentList = [];
    }
    e.target.value = "";
    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            item_id: item.id,
            comment: comment,
            action: "insertComment"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "newComment"]);
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
            actions.updateState(state);
        }
    });
};

export const itemClicked = (state, actions) => ({ e, key }) => {
    e.preventDefault();
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
        chrome_id: state.user.data.chrome_id,
        item_id: item.id,
        action: "itemClicked"
    };
    _gaq.push(["_trackEvent", "clicked", "itemClicked"]);
    if (chrome.extension) {
        var bgPage = chrome.extension.getBackgroundPage();
        bgPage.sendClickedStat(params);
    }
    window.open(e.target.href);
    actions.updateState(state);
};

export const lazyLoad = (state, actions) => ({ e, image }) => {
    let ele = document.createElement("img");
    ele.src = image;
    ele.onload = () => {
        e.src = image;
    };
};

export const editComment = (state, actions) => ({
    model,
    itemKey,
    commentKey
}) => {
    state.editComment.open = true;
    state.editComment.cursor = { model, itemKey, commentKey };
    let item = deepFind(state, model).data.rows[itemKey];
    let [root] = model.split(".");
    let comment;
    if (root == "modals") {
        comment =
            state[root].notification.data.rows[itemKey].commentList[commentKey];
    } else {
        comment =
            state[root].tabs[state[root].active].data.rows[itemKey].commentList[
                commentKey
            ];
    }
    state.editComment.data = comment;
    actions.updateState(state);
};

export const saveEditedComment = (state, actions) => comment => {
    const { model, itemKey, commentKey } = state.editComment.cursor;
    let item = deepFind(state, model).data.rows[itemKey];
    let [root] = model.split(".");
    let commentObj = null;
    if (root == "modals") {
        commentObj =
            state[root].notification.data.rows[itemKey].commentList[commentKey];
    } else {
        commentObj =
            state[root].tabs[state[root].active].data.rows[itemKey].commentList[
                commentKey
            ];
    }
    commentObj.comment = comment;
    let commentId = commentObj.id;

    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            comment_id: commentId,
            comment: comment,
            action: "updateComment"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "saveEditedComment"]);
    actions.cancelCommentEdit();
    request(params).then(result => {
        if (result.flag) {
            actions.updateState(state);
        }
    });
};

export const deleteComment = (state, actions) => {
    const { model, itemKey, commentKey } = state.editComment.cursor;
    let item = deepFind(state, model).data.rows[itemKey];
    let [root] = model.split(".");
    let commentId = null;
    if (root == "modals") {
        commentId =
            state[root].notification.data.rows[itemKey].commentList[commentKey]
                .id;
        delete state[root].notification.data.rows[itemKey].commentList[
            commentKey
        ];
    } else {
        commentId =
            state[root].tabs[state[root].active].data.rows[itemKey].commentList[
                commentKey
            ].id;
        delete state[root].tabs[state[root].active].data.rows[itemKey]
            .commentList[commentKey];
    }

    let params = {
        method: "POST",
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            comment_id: commentId,
            action: "deleteComment"
        }
    };
    _gaq.push(["_trackEvent", "clicked", "deleteComment"]);
    request(params).then(result => {
        if (result.flag) {
            actions.cancelCommentEdit();
            actions.updateState(state);
        }
    });
};

export const cancelCommentEdit = (state, actions) => {
    state.editComment.open = false;
    state.editComment.data = {};
    state.editComment.cursor = {};
    actions.updateState(state);
};
