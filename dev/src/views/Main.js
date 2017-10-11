import { h } from "hyperapp";
import { TabComponent } from "./TabComponent";
import Notifications from "./Notifications/Notifications";
import Feed from "./Feed";
import Post from "./Post";
import MyLinks from "./MyLinks";
import Groups from "./Groups";
import Settings from "./Settings";
import Search from "./Search";
import request from "../actions/request";
import ProfileModal from "./Modals/ProfileModal";
import InviteModal from "./Modals/InviteModal";

window.moment = require("moment");
require("../lib/jquery");
require("../lib/token-input");

import "../../public/scss/app/style.scss";
import "../../public/scss/themes/dark/dark.scss";

const main = (state, actions) => {
    let data = null;
    switch (state.mainNav.active) {
        case "notification":
            data = (
                <Notifications
                    tabs={state.notificationTabs.tabs}
                    active={state.notificationTabs.active}
                    state={state}
                    loadMore={actions.loadMore}
                    onScroll={actions.onScroll}
                    onTabChange={actions.onTabChange}
                    actions={actions}
                    name="notification"
                />
            );
            break;
        case "feed":
            data = (
                <Feed
                    tab={state.mainNav.tabs[state.mainNav.active]}
                    actions={actions}
                    onScroll={actions.onScroll}
                    loadMore={actions.loadMore}
                    state={state}
                />
            );
            break;
        case "search":
            data = (
                <Search
                    tab={state.mainNav.tabs[state.mainNav.active]}
                    actions={actions}
                    onScroll={actions.onScroll}
                    loadMore={actions.loadMore}
                    state={state}
                />
            );
            break;
        case "post":
            data = <Post state={state} actions={actions} />;
            break;
        case "links":
            data = (
                <MyLinks
                    tabs={state.linkTabs.tabs}
                    active={state.linkTabs.active}
                    state={state}
                    loadMore={actions.loadMore}
                    onScroll={actions.onScroll}
                    onTabChange={actions.onTabChange}
                    actions={actions}
                />
            );
            break;
        case "groups":
            data = (
                <Groups
                    actions={actions}
                    tabs={state.groupTabs.tabs}
                    active={state.groupTabs.active}
                    state={state}
                />
            );
            break;
        case "settings":
            data = (
                <Settings
                    tabs={state.settingsTabs.tabs}
                    active={state.settingsTabs.active}
                    state={state}
                    actions={actions}
                />
            );
            break;
        default:
            console.log(state);
    }

    return (
        <div class="container">
            <TabComponent
                classes="main-nav"
                type="nav-tabs"
                state={state}
                stateKey="mainNav"
                onChange={actions.onTabChange}
                html={data}
            />
            {state.modals.profile.open && (
                <ProfileModal
                    onScroll={actions.onScroll}
                    state={state}
                    actions={actions}
                    name="profile"
                />
            )}
            {state.modals.invite.open && (
                <InviteModal state={state} actions={actions} name="invite" />
            )}
        </div>
    );
};

export default main;
