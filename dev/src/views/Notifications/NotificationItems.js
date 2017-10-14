import { h } from "hyperapp";

const getTimeAgo = created_at => {
    return moment(created_at)
        .add(moment().utcOffset(), "minutes")
        .fromNow();
};
export const Link = data => (
    <div>
        <a href="" class="link" data-id="{ITEM_ID}">
            <div>
                <span class="strong">{data.actors} </span>
                <span class="activity">
                    posted a link
                    <span class="link strong"> {data.title}</span>
                    <span class="group">
                        {" "}
                        in <i class="fa fa-users" aria-hidden="true" />{" "}
                        {data.group_name}
                    </span>
                </span>
            </div>
            <div class="item-meta">
                <i class="fa fa-link" aria-hidden="true" />
                <span class="comment-date grey">
                    {getTimeAgo(data.created_at)}
                </span>
            </div>
        </a>
    </div>
);

export const Comment = data => (
    <div>
        <a href="" class="link" data-id="{ITEM_ID}">
            <div>
                <span class="strong">{data.actors} </span>
                <span class="activity">
                    commented on <span class="strong">
                        {data.poster}'s
                    </span>{" "}
                    link
                    <span
                        style="font-weight: bold; color: #CECECE"
                        class="comment"
                    >
                        {" "}
                        {data.comment}{" "}
                    </span>
                    <span class="group">
                        in <i class="fa fa-users" aria-hidden="true" /> {" "}
                        {data.group_name}{" "}
                    </span>
                </span>
            </div>
            <div class="item-meta">
                <i class="fa fa-comment" aria-hidden="true" />
                <span class="comment-date grey">
                    {getTimeAgo(data.created_at)}
                </span>
            </div>
        </a>
    </div>
);

export const Like = data => (
    <div>
        <a href="" class="link" data-id="{ITEM_ID}">
            <div>
                <span class="strong">{data.actors} </span>
                <span class="activity">
                    liked <span class="strong">{data.poster}'s</span> link
                    <span
                        style="font-weight: bold; color: #CECECE"
                        class="link"
                    >
                        {" "}
                        "{data.title}"
                    </span>
                    <span class="group">
                        in <i class="fa fa-users" aria-hidden="true" />{" "}
                        {data.group_name}
                    </span>
                </span>
            </div>
            <div class="item-meta">
                <i class="fa fa-heart" aria-hidden="true" />
                <span class="comment-date grey">
                    {getTimeAgo(data.created_at)}
                </span>
            </div>
        </a>
    </div>
);

export const JoinedGroup = data => (
    <div>
        <div>
            <span class="strong">{data.actors} </span>
            <span class="activity">
                joined
                <span class="group">
                    {" "}
                    <i class="fa fa-users" aria-hidden="true" />{" "}
                    {data.group_name}
                </span>
            </span>
        </div>
        <div class="item-meta">
            <i class="fa fa-sign-in" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);

export const JoinedLinkcast = data => (
    <div>
        <div>
            <span class="strong">{data.actors}</span>
            <span class="activity">
                {" "}
                joined{" "}
                <span style="color:#c53333; font-weight: bold"> LinkCast</span>
            </span>
        </div>
        <div class="item-meta">
            <i class="fa fa-user" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);

export const NewGroup = data => (
    <div>
        <div class="group_row">
            <span class="strong">{data.actors} </span>
            <span class="activity">
                created a new group <i
                    class="fa fa-users"
                    aria-hidden="true"
                />{" "}
                <span style="color:#c53333; font-weight: bold">
                    {" "}
                    {data.group_name}.{" "}
                </span>
                {data.accepted == "0" && (
                    <a
                        href="#"
                        class="group-join green"
                        onclick={e =>
                            data.joinGroupFromNotification({
                                e,
                                index: data.key,
                                group: {
                                    group_id: data.group_id,
                                    is_public: 1
                                }
                            })}
                    >
                        Join Now
                    </a>
                )}
            </span>
            <div>
                <i>{data.desc}</i>
            </div>
        </div>
        <div class="item-meta">
            <i class="fa fa-users" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);

export const GroupInvite = data => (
    <div>
        <div class="group_row" data-aid="{ID}" data-group_id="{group_id}">
            <span class="strong">{data.admin}</span>
            <span class="activity">
                {" "}
                invited you to join{" "}
                <span style="font-weight: bold"> {data.group_name}.</span>
                <a
                    href="#"
                    class="group-accept green"
                    onclick={e =>
                        data.acceptGroupInvite({
                            e,
                            index: data.key,
                            activity: {
                                group_id: data.group_id,
                                activity_id: data.id
                            }
                        })}
                >
                    {" "}
                    Accept
                </a>{" "}
                |
                <a
                    href="#"
                    class="group-reject red"
                    onclick={e =>
                        data.rejectGroupInvite({
                            e,
                            index: data.key,
                            activity: {
                                group_id: data.group_id,
                                activity_id: data.id
                            }
                        })}
                >
                    {" "}
                    Reject
                </a>
            </span>
        </div>
        <div class="item-meta">
            <i class="fa fa-users" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);

export const PrivateGroupRequest = data => (
    <div>
        <div class="group_row" data-aid="{ID}" data-group_id="{group_id}">
            <span class="strong">{data.actors}</span>
            <span class="activity">
                {" "}
                wants to join{" "}
                <span style="font-weight: bold"> {data.group_name}.</span>
                <a
                    href="#"
                    class="group-accept green"
                    onclick={e =>
                        data.approveGroupRequest({
                            e,
                            index: data.key,
                            activity: {
                                group_id: data.group_id,
                                activity_id: data.id
                            }
                        })}
                >
                    {" "}
                    Approve
                </a>{" "}
                |
                <a
                    href="#"
                    class="group-reject red"
                    onclick={e =>
                        data.rejectGroupRequest({
                            e,
                            index: data.key,
                            activity: {
                                group_id: data.group_id,
                                activity_id: data.id
                            }
                        })}
                >
                    {" "}
                    Reject
                </a>
            </span>
        </div>
        <div class="item-meta">
            <i class="fa fa-users" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);

export const Linkcast = data => (
    <div class="announcement">
        <div class="linkcast-msg" style="color:{LCOLOR}">
            {data.actors} - {data.title}
        </div>
        <div class="item-meta">
            <i class="fa fa-bullhorn blink_me" aria-hidden="true" />
            <span class="comment-date grey">{getTimeAgo(data.created_at)}</span>
        </div>
    </div>
);
