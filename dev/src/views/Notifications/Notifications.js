import { h } from "hyperapp";
import {
    Link,
    Comment,
    GroupInvite,
    JoinedGroup,
    JoinedLinkcast,
    Like,
    Linkcast,
    NewGroup,
    PrivateGroupRequest
} from "./NotificationItems";
import { TabComponent } from "../TabComponent";
import ScrollHoc from "../Common/ScrollHoc";

import ModalHoc from "../Common/ModalHoc";
import LinkItem from "../Links/LinkItem";

const Notifications = props => {
    let data = null;

    const joinGroup = ({ e, index, group }) => {
        e.preventDefault();
        props.actions.joinGroup({
            group,
            callback: () => {
                props.actions.notificationJoinedGroup(index);
            }
        });
    };
    switch (props.active) {
        case "notLinks":
            data = props.tabs[props.active].data.rows.map((item, i) => {
                return (
                    <div
                        key={i}
                        class="notification-item clearfix"
                        data-id={item.id}
                        onclick={() =>
                            props.actions.notificationClicked({
                                active: props.active,
                                index: i
                            })}
                    >
                        <NotificationItem {...item} />
                    </div>
                );
            });
            data = (
                <div
                    model="notificationTabs.tabs.notLinks"
                    class="scroll"
                    onscroll={props.onScroll}
                >
                    {data}
                    {props.state.modals.notification.open &&
                        ModalHoc(() => {
                            return (
                                <div model="modals.notification">
                                    <LinkItem
                                        key="0"
                                        actions={props.actions}
                                        user_id={props.state.user.data.id}
                                        item={
                                            props.state.modals.notification.data
                                                .rows[0]
                                        }
                                    />
                                </div>
                            );
                        })(props)}
                </div>
            );
            break;
        case "notGroups":
            data = props.tabs[props.active].data.rows.map((item, i) => {
                return (
                    <div
                        key={i}
                        class="notification-item clearfix"
                        data-id={item.id}
                        onclick={() =>
                            props.actions.notificationClicked({
                                active: props.active,
                                index: i
                            })}
                    >
                        <NotificationItem
                            key={i}
                            acceptGroupInvite={props.actions.acceptGroupInvite}
                            rejectGroupInvite={props.actions.rejectGroupInvite}
                            approveGroupRequest={
                                props.actions.approveGroupRequest
                            }
                            rejectGroupRequest={
                                props.actions.rejectGroupRequest
                            }
                            joinGroupFromNotification={joinGroup}
                            {...item}
                        />
                    </div>
                );
            });
            data = (
                <div
                    model="notificationTabs.tabs.notGroups"
                    class="scroll"
                    onscroll={props.onScroll}
                >
                    {data}
                </div>
            );
            break;
        default:
        //console.log(state);
    }
    let status = props.state.notificationStatus;
    return (
        <TabComponent
            classes="secondary-nav"
            type="nav-pills"
            state={props.state}
            stateKey="notificationTabs"
            onChange={props.onTabChange}
            html={data}
            onBeforeLabelSet={label => {
                if (label == "Links" && status.links.rows.length > 0) {
                    return `${label} (${status.links.rows.length})`;
                } else if (label == "Groups" && status.groups.rows.length > 0) {
                    return `${label} (${status.groups.rows.length})`;
                }
                return label;
            }}
        />
    );
};

export const NotificationItem = item => {
    if (item.type == "joined_group") return <JoinedGroup {...item} />;
    else if (item.type == "link") return <Link {...item} />;
    else if (item.type == "like") return <Like {...item} />;
    else if (item.type == "comment") return <Comment {...item} />;
    else if (item.type == "joined_linkcast")
        return <JoinedLinkcast {...item} />;
    else if (item.type == "new_group") return <NewGroup {...item} />;
    else if (item.type == "group_invite") return <GroupInvite {...item} />;
    else if (item.type == "request_private_group_join")
        return <PrivateGroupRequest {...item} />;
};

export default ScrollHoc(Notifications);
