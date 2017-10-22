import { h } from "hyperapp";
const PublicGroups = ({ actions, state, tab }) => {
    const groups = state.allGroups.data.map((group, key) => {
        return (
            <PublicGroupsTable
                user_id={state.user.data.id}
                actions={actions}
                key={key}
                item={group}
            />
        );
    });
    return (
        <div>
            <p>
                These are the public group. You can join and start posting links
                if you have the permission.
            </p>
            <div class="scroll">
                <table style="margin-bottom:0px;" class="table table-hover">
                    <thead>
                        <tr>
                            <th width="160">Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Admin</th>
                            <th>Access</th>
                            <th>Users</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="items">{groups}</tbody>
                </table>
            </div>
        </div>
    );
};

const PublicGroupsTable = ({ actions, item, user_id, key }) => {
    let isPublic = parseInt(item.is_public);
    const joinGroup = ({ e, group }) => {
        e.preventDefault();
        actions.joinGroup({ group });
    };

    return (
        <tr class="group_row">
            <td>
                <a href="#" class="group-name">
                    <strong>{item.name}</strong>
                </a>
            </td>
            <td align="center" style={{ color: isPublic ? "" : "red" }}>
                {isPublic ? (
                    <i class="fa fa-unlock" aria-hidden="true" />
                ) : (
                    <i class="fa fa-lock" aria-hidden="true" />
                )}
            </td>
            <td>{item.desc}</td>
            <td>{item.adminName}</td>
            <td>{item.group_rights}</td>
            <td align="center">{item.total}</td>
            <td align="center">
                {(() => {
                    let action = "Leave";
                    if (item.total == 1 && item.admin == user_id) {
                        action = "Delete";
                    }
                    if (item.status == "1") {
                        return (
                            <a
                                href="#"
                                class="red group-leave"
                                onclick={e => actions.leaveGroup({ e, key })}
                            >
                                {action}
                            </a>
                        );
                    } else if (item.status == "0") {
                        return (
                            <a
                                href="#"
                                class="green group-join"
                                onclick={e =>
                                    joinGroup({
                                        e,
                                        group: {
                                            group_id: item.id,
                                            is_public: item.is_public
                                        }
                                    })}
                            >
                                {isPublic ? "Join" : "Request"}
                            </a>
                        );
                    } else if (item.status == "2") {
                        return <span>Pending</span>;
                    }
                })()}
            </td>
        </tr>
    );
};
export default PublicGroups;
