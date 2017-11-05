/**
 * There are no events for this application
 * But this is an example of directory and file structure for events
 * Seperation of concerns are key in functional paradigms!
*/
var ResizeObserver = require("resize-observer-polyfill").default;
let $bgEle, $container;

const changeSize = () => {
    $bgEle.forEach(ele => {
        ele.style.width = $container.offsetWidth + "px";
        ele.style.height = $container.offsetHeight + "px";
    });
};
const observeSizeChanges = () => {
    $bgEle = document.querySelectorAll(".background");
    $container = document.querySelector(".container");
    changeSize();
    new ResizeObserver(changeSize).observe($container);
};
export default {
    load: (state, actions) => {
        setTimeout(observeSizeChanges, 100);
        if (localStorage.chrome_id) {
            actions.initialize({
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
                        stateKey: "notificationTabs",
                        tab_id: "notLinks"
                    });
                    actions.fetchGroups();
                    actions.detectSite();
                }
            });
            if (new Date().getDate() == 31) {
                if (
                    !localStorage.counter ||
                    parseInt(localStorage.counter) <= 4
                ) {
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
    }
};
