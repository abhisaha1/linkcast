import { h } from "hyperapp";
import DropDown from "./Common/DropDown";
import LinkItem from "./Links/LinkItem";
import Links from "./Links/Links";
import ScrollHoc from "./Common/ScrollHoc";

const Feed = props => {
    const onGroupChange = e => {
        props.actions.setDefaultGroup(e.target.options.selectedIndex);
    };
    return (
        <div>
            <div class="footer">
                <div class="pull-left">Group:</div>
                <div class="pull-left">
                    <DropDown
                        classes="groups-dd"
                        identifier="group_id"
                        selected={props.state.groups.defaultGroup}
                        data={props.state.groups.data}
                        onChange={onGroupChange}
                    />
                </div>
                <span class="clearfix" />
            </div>
            <Links
                model="mainNav.tabs.feed"
                tab={props.tab}
                actions={props.actions}
                loadMore={props.actions.loadMore}
                onScroll={props.onScroll}
                state={props.state}
            />
        </div>
    );
};
export default ScrollHoc(Feed);
