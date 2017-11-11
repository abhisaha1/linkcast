import { app } from "hyperapp";
import actions from "./actions";
import state from "./state";
import view from "./views/Main";
import logger from "@hyperapp/logger";
import persist from "./lib/persist";
import { Storage } from "./actions/common";

const options = {
    state,
    actions,
    view
};
setTimeout(() => {
    const appActions = app(persist(options));
    const workOffline = parseInt(Storage.get("offline") || 0);
    if (workOffline) {
        appActions.__removePersist();
        Storage.set({ offline: 0 });
    }
    appActions.init();
    document.querySelector("#app").style.minHeight = "560px";
}, 200);
