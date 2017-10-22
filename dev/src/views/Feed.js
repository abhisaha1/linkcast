import { h } from "hyperapp";
import DropDown from "./Common/DropDown";
import LinkItem from "./Links/LinkItem";
import Links from "./Links/Links";
import ScrollHoc from "./Common/ScrollHoc";

const Feed = props => {
    const onGroupChange = e => {
        props.actions.setDefaultGroup(e.target.options.selectedIndex);
    };
    const invite = e => {
        let selectedGroup = props.state.groups.data.filter(
            group => group.group_id == props.state.groups.defaultGroup
        )[0];
        if (selectedGroup.group_id == 0) {
            return props.actions.setMessage("Change the group to invite");
        }
        if (
            selectedGroup.is_public == "0" &&
            selectedGroup.admin !== props.state.user.data.id
        ) {
            return props.actions.setMessage(
                "Only admin can invite in Private groups"
            );
        }
        props.actions.showInviteModal({
            e,
            group_id: props.state.groups.defaultGroup,
            title: `Invite users in ${selectedGroup.name}`
        });
    };

    return (
        <div>
            <div class="footer">
                <div class="pull-left">Switch Group: </div>
                <div class="pull-left">
                    <DropDown
                        classes="groups-dd"
                        identifier="group_id"
                        selected={props.state.groups.defaultGroup}
                        data={props.state.groups.data}
                        onChange={onGroupChange}
                    />
                </div>
                <div class="pull-right">
                    <a class="invite-link" href="#" onclick={invite}>
                        Invite
                    </a>
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
