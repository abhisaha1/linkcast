/**
 * There are no events for this application
 * But this is an example of directory and file structure for events
 * Seperation of concerns are key in functional paradigms!
*/
export default {
    load: (state, actions, element) => {
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
        } else {
            state.mainNav.active = "settings";
            state.settingsTabs.active = "profile";
            return state;
        }
    }
};
