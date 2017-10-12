import { h } from "hyperapp";
import Links from "./Links/Links";
import { TabComponent } from "./TabComponent";
import ScrollHoc from "./Common/ScrollHoc";
const MyLinks = props => {
    const onGroupChange = e => {
        return <div />;
    };
    let data = null;
    switch (props.active) {
        case "favourites":
            data = (
                <Links
                    model="linkTabs.tabs.favourites"
                    tab={props.tabs[props.active]}
                    onScroll={props.onScroll}
                    loadMore={props.actions.loadMore}
                    state={props.state}
                    actions={props.actions}
                />
            );
        case "sent":
            data = (
                <div>
                    <Links
                        model="linkTabs.tabs.sent"
                        tab={props.tabs[props.active]}
                        onScroll={props.onScroll}
                        loadMore={props.actions.loadMore}
                        state={props.state}
                        actions={props.actions}
                    />
                </div>
            );
            break;
        default:
            console.log(state);
    }

    return (
        <TabComponent
            classes="secondary-nav"
            type="nav-pills"
            state={props.state}
            stateKey="linkTabs"
            onChange={props.onTabChange}
            html={data}
        />
    );
};
export default ScrollHoc(MyLinks);
