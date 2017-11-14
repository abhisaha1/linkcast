import { request } from "../lib/request";
import { validateEmail, getRandomToken, Storage } from "../actions/common";

export const saveProfile = (state, actions) => ({ e, data }) => {
    e.preventDefault();
    data = Object.assign(state.user.data, data);

    let params = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            nickname: data.nickname,
            color: data.color,
            bio: data.bio,
            action: "saveProfile"
        }
    };
    request(params).then(result => {
        state.user.data = data;
        actions.setMessage(result.msg);
        actions.updateState(state);
    });
};

export const showProfile = (state, actions) => ({ e, user_id }) => {
    e.preventDefault();

    state.modals.profile.links.isFetching = true;
    state.modals.profile.open = 1;
    actions.updateState(state);
    let params1 = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            target_id: user_id,
            action: "getProfile"
        }
    };
    request(params1).then(result => {
        state.modals.profile.user = result;
        state.modals.profile.user.id = user_id;
        state.modals.profile.links.data.page = 0;
        actions.updateState(state);
    });
    actions.getUserLinks({ e, user_id });
};

export const getUserLinks = (state, actions) => ({ e, user_id }) => {
    e.preventDefault();

    state.modals.profile.links.isFetching = true;
    state.modals.profile.open = 1;
    actions.updateState(state);
    let newPage = parseInt(state.modals.profile.links.data.page) + 1;
    let params2 = {
        queryParams: {
            chrome_id: state.user.data.chrome_id,
            target_id: user_id,
            action: "getOtherUserTracks",
            page: newPage,
            count: 5
        }
    };

    request(params2).then(result => {
        state.modals.profile.links.isFetching = false;
        if (newPage == 1) {
            state.modals.profile.links.data.rows = result.rows;
        } else {
            state.modals.profile.links.data.rows = state.modals.profile.links.data.rows.concat(
                result.rows
            );
        }
        state.modals.profile.links.data.page = newPage;
        actions.updateState(state);
    });
};

export const fetchUserInfo = (state, actions) => ({ chrome_id, callback }) => {
    let params = {
        queryParams: {
            chrome_id: chrome_id,
            action: "fetchUserInfo"
        }
    };
    request(params).then(result => {
        if (result.flag == 1) {
            result.data.chrome_id = chrome_id;
            state.user.data = result.data;
            state.user.loggedIn = true;
            state.groups.defaultGroup = localStorage.defaultGroup;
            actions.updateState(state);
            callback();
        }
    });
};

export const saveCustomization = (state, actions) => ({ e, key }) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    state.user.customize[key] = value;
    localStorage[key] = value;
    if (key == "offline") {
        (!value && actions.__removePersist()) ||
            (value && actions.__initPersist());
    }
    actions.updateState(state);
};
export const doLogout = (state, actions) => data => {
    state.user.loggedIn = false;
    localStorage.clear();
    actions.updateState(state);
};

export const doLogin = (state, actions) => data => {
    let params = {
        method: "POST",
        queryParams: {
            nickname: data.nickname,
            password: data.password,
            action: "loginUser"
        }
    };
    if (data.nickname.length > 0 && data.password.length > 0) {
        state.user.login.requesting = true;
        actions.updateState(state);
        request(params).then(result => {
            if (result.flag == 1) {
                let lsData = {
                    defaultGroup: 1,
                    nickname: data.nickname,
                    loggedIn: true,
                    chrome_id: result.chrome_id
                };
                Storage.set(lsData); //overwrite
                Storage.set(
                    {
                        sound: 1,
                        notification: 1,
                        offline: 0
                    },
                    false // dont overwrite
                );
                state.message = "";
                //update the state
                state.user.data = result.data;
                state.user.loggedIn = true;
                state.user.customize.sound = parseInt(Storage.get("sound"));
                state.user.customize.notification = parseInt(
                    Storage.get("notification")
                );
                state.user.customize.offline = parseInt(Storage.get("offline"));
                if (chrome.storage) {
                    chrome.storage.sync.set({
                        userid: result.data.chrome_id
                    });
                }
                actions.updateState(state);
                actions.fetchGroups();
                actions.fetchAllGroups();
            } else {
                actions.setMessage(result.msg);
            }
            state.user.login.requesting = false;
            state.user.login.msg = result.msg;
            state.user.login.flag = result.flag;
            state.groups.defaultGroup = localStorage.defaultGroup;
            actions.updateState(state);
        });
    } else {
        actions.setMessage("All fields are required");
        actions.updateState(state);
    }
};

export const doRegister = (state, actions) => data => {
    let chrome_id = getRandomToken();
    let params = {
        queryParams: {
            chrome_id: chrome_id,
            nickname: data.nickname,
            password: data.password,
            email: data.email,
            action: "registerUser"
        }
    };
    if (data.nickname.length > 0 && data.password.length > 0) {
        state.user.register.requesting = true;
        actions.updateState(state);
        request(params).then(result => {
            if (result.flag == 1) {
                actions.doLogin(data);
            }
        });
    }
};

export const forgotPassword = (state, actions) => {
    state.modals.forgotPassword.open = true;
    actions.updateState(state);
};

export const sendRecoveryEmail = (state, actions) => data => {
    if (data.email.length == 0) {
        actions.setMessage("Enter an email");
        actions.updateState(state);
    }
    let valid = validateEmail(data.email);
    if (valid) {
        let params = {
            method: "POST",
            queryParams: {
                email: data.email,
                action: "forgotPassword"
            }
        };
        request(params).then(result => {
            if (result.flag == 1) {
                state.modals.forgotPassword.open = false;
                actions.setMessage("Check your email");
            }
            actions.setMessage(result.msg);
            actions.updateState(state);
        });
    } else {
        actions.setMessage("Invalid Email");
        actions.updateState(state);
    }
};
