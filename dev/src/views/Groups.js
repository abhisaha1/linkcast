import { h } from "hyperapp";
import Links from "./Links/Links";
import { TabComponent } from "./TabComponent";
import ScrollHoc from "./Common/ScrollHoc";
import PublicGroups from "./Groups/PublicGroups";
import ManageGroups from "./Groups/ManageGroups";
import CreateGroup from "./Groups/CreateGroup";

const Groups = ({ active, actions, tabs, state }) => {
    const onGroupChange = e => {
        return <div />;
    };
    let data = null;
    switch (active) {
        case "manage":
            data = (
                <ManageGroups
                    actions={actions}
                    state={state}
                    tab={tabs[active]}
                />
            );
            break;
        case "public":
            data = (
                <PublicGroups
                    actions={actions}
                    state={state}
                    tab={tabs[active]}
                />
            );
            break;
        case "create":
            data = (
                <CreateGroup
                    actions={actions}
                    state={state}
                    tab={tabs[active]}
                />
            );
            break;
    }

    return (
        <TabComponent
            classes="secondary-nav"
            state={state}
            type="nav-pills"
            stateKey="groupTabs"
            onChange={actions.onTabChange}
            html={data}
        />
    );
};
export default Groups;
