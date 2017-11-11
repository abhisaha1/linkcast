import { h } from "hyperapp";
import { TabComponent } from "./TabComponent";
import Notifications from "./Notifications/Notifications";
import Feed from "./Feed";
import Post from "./Post";
import MyLinks from "./MyLinks";
import Groups from "./Groups";
import Settings from "./Settings";
import Search from "./Search";
import ProfileModal from "./Modals/ProfileModal";
import InviteModal from "./Modals/InviteModal";
import ForgotPasswordModal from "./Modals/ForgotPasswordModal";
import EditCommentModal from "./Modals/EditCommentModal";

import dark from "../../public/pcss/themes/dark/dark.pcss";
import style from "../../public/pcss/style.pcss";

window.moment = require("moment");
require("../lib/jquery");
require("../lib/token-input");
require("./Track");

const main = (state, actions) => {
    let data = null;
    const appHeight = document.body.clientHeight;
    const msgTopSpace = appHeight - 80;
    actions.resetMessage();
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
            {state.modals.forgotPassword.open && (
                <ForgotPasswordModal
                    state={state}
                    actions={actions}
                    name="forgotPassword"
                />
            )}
            {state.message != "" && (
                <div
                    id="msg"
                    class="alert alert-warning"
                    style={{ top: msgTopSpace + "px" }}
                >
                    {state.message}
                </div>
            )}
            <div class="preloader center processor invisible">
                <div
                    class="progress-bar progress-bar-striped active"
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width:100%"
                />
            </div>
            <footer id="footer">Linkcast v{state.version}</footer>
        </div>
    );
};

export default main;
