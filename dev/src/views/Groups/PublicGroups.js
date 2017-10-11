import { h } from "hyperapp";
const PublicGroups = ({ actions, state, tab }) => {
    const groups = state.allGroups.data.map((group, key) => {
        return <PublicGroupsTable actions={actions} key={key} item={group} />;
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

const PublicGroupsTable = ({ actions, item, key }) => {
    let isPublic = parseInt(item.is_public);
    const joinGroup = (e, group) => {
        e.preventDefault();
        actions.joinGroup(group);
    };
    return (
        <tr class="group_row">
            <td>
                <a href="#" class="group-name">
                    <strong>{item.name}</strong>
                </a>
            </td>
            <td>{isPublic ? "Public" : "Private"}</td>
            <td>{item.desc}</td>
            <td>{item.group_rights}</td>
            <td>{item.total}</td>
            <td>
                {(() => {
                    return item.status == "1" ? (
                        <a
                            href="#"
                            class="red group-leave"
                            onclick={e => actions.leaveGroup({ e, key })}
                        >
                            Leave
                        </a>
                    ) : (
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
                })()}
            </td>
        </tr>
    );
};
export default PublicGroups;
