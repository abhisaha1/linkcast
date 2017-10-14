import { h } from "hyperapp";
import Links from "./Links/Links";
import { TabComponent } from "./TabComponent";
import Profile from "./Settings/Profile";
import Customize from "./Settings/Customize";
import About from "./Settings/About";

const Settings = ({ active, state, actions, tabs }) => {
    const onGroupChange = e => {
        return <div />;
    };
    let data = null;
    switch (active) {
        case "profile":
            data = (
                <Profile
                    state={state}
                    model="settingsTabs.tabs.profile"
                    tab={tabs[active]}
                    actions={actions}
                />
            );
            break;
        case "customize":
            data = (
                <div>
                    <Customize
                        state={state}
                        model="settingsTabs.tabs.customize"
                        tab={tabs[active]}
                        actions={actions}
                    />
                </div>
            );
            break;
        case "about":
            data = (
                <div>
                    <About
                        model="settingsTabs.tabs.about"
                        state={state}
                        tab={tabs[active]}
                    />
                </div>
            );
            break;
        default:
            // onTabChange({
            //     stateKey: "settingsTabs",
            //     tab_id: active
            // });
            break;
    }
    return (
        <TabComponent
            classes="secondary-nav"
            type="nav-pills"
            state={state}
            stateKey="settingsTabs"
            onChange={actions.onTabChange}
            html={data}
        />
    );
};
export default Settings;
