import { request } from "../lib/request";
let msgTimeout = null;

export const navClicked = (state, actions) => data => {
    let id = data.currentTarget.dataset.id;
    state.nav.main.active = id;
    actions.updateState(state);
};

export const onScroll = (state, actions) => ({ e, callback }) => {
    let ele = e.currentTarget;
    let height = ele.clientHeight;
    let scroll_top = ele.scrollTop;
    let scrollHeight = ele.scrollHeight;

    if (scroll_top + height >= scrollHeight) {
        if (typeof callback == "function") callback(e);
    }
    e.stopPropagation();
    e.preventDefault();
    return false;
};

export const closeModal = (state, actions) => name => {
    state.modals[name].open = false;
    actions.updateState(state);
};

export const updateState = (state, actions) => newState => {
    return { newState };
};

export const clearMessage = (state, actions) => {
    state.message = "";
    actions.updateState(state);
};

export const resetMessage = (state, actions) => {
    if (state.message != "") {
        msgTimeout = setTimeout(() => {
            actions.clearMessage();
        }, 3000);
    }
};

export const setMessage = (state, actions) => message => {
    clearTimeout(msgTimeout);
    state.message = message;
    actions.updateState(state);
    actions.resetMessage();
};

export const setVersion = (state, actions) => version => {
    state.version = version;
    actions.updateState(state);
};

export const deepFind = function(obj, path) {
    for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
        obj = obj[path[i]];
    }
    return obj;
};

const basePropertyOf = object => {
    return function(key) {
        return object == null ? undefined : object[key];
    };
};

export const escape = str => {
    /** Used to map characters to HTML entities. */
    const htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    let escapeHtmlChar = basePropertyOf(htmlEscapes);
    let reUnescapedHtml = /[&<>"']/g;
    return str.replace(reUnescapedHtml, escapeHtmlChar);
};

export const unescape = str => {
    /** Used to map HTML entities to characters. */
    const htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
    };
    let unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    let reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
    return str.replace(reEscapedHtml, unescapeHtmlChar);
};

export const getRandomToken = () => {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = "";
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
};

export const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const Storage = new function() {
    this.set = (data, overwrite = true) => {
        if (typeof data === "object") {
            Object.keys(data).map(key => {
                if (!overwrite && localStorage[key]) return;
                localStorage[key] = data[key];
            });
        }
    };
    this.get = key => localStorage[key];
    return this;
}();
