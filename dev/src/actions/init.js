import { Storage } from "../actions/common";

const ResizeObserver = require("resize-observer-polyfill").default;
let $bgEle, $container;

const changeBackgroundSize = () => {
    $bgEle.forEach(ele => {
        ele.style.width = $container.offsetWidth + "px";
        ele.style.height = $container.offsetHeight + "px";
    });
};
const observeSizeChanges = () => {
    $bgEle = document.querySelectorAll(".background");
    $container = document.querySelector(".container");
    new ResizeObserver(changeBackgroundSize).observe($container);
};

export const init = (state, actions) => data => {
    setTimeout(observeSizeChanges, 100);
    state.modals.notification.open = false;
    if (localStorage.chrome_id) {
        actions.fetchUserInfo({
            chrome_id: localStorage.chrome_id,
            callback: () => {
                if (chrome.extension) {
                    var bgPage = chrome.extension.getBackgroundPage();
                    actions.setNotificationCount(bgPage.countData);
                    bgPage.updateNotification(0);
                    let manifest = chrome.runtime.getManifest();
                    let version = manifest.version;
                    actions.setVersion(version);
                }
                actions.onTabChange({
                    stateKey: "mainNav",
                    tab_id: state.mainNav.active
                });
                actions.fetchGroups();

                state.user.customize.sound = parseInt(Storage.get("sound"));
                state.user.customize.notification = parseInt(
                    Storage.get("notification")
                );
                state.user.customize.offline = parseInt(Storage.get("offline"));
                actions.updateState(state);
            }
        });
        if (false) {
            if (!localStorage.counter || parseInt(localStorage.counter) <= 4) {
                document.querySelector("body").classList.add("halloween");
                if (!localStorage.counter) {
                    localStorage.counter = 0;
                }
                localStorage.counter = parseInt(localStorage.counter) + 1;
            }
        }
    } else {
        state.mainNav.active = "settings";
        state.settingsTabs.active = "profile";
        actions.updateState(state);
    }
};
