import { h } from "hyperapp";
import { Radio } from "../Common/Radio";

const Users = ({ actions, item, isAdmin, group_id, index }) => {
    var remove = isAdmin ? "" : "remove";
    let can_post = item.group_rights == "can_post";
    let can_read = item.group_rights == "can_read";
    const changePermission = group_rights => {
        actions.changePublicRights({
            user_id: item.id,
            group_rights: group_rights,
            group_id: group_id,
            index: index
        });
    };
    let style = {
        verticalAlign: "middle"
    };
    return (
        <tr class="user-item" data-id="{USER_ID}">
            <td style={style}>
                <span style={{ color: item.color }}>{item.nickname}</span>
            </td>
            <td style={style}>
                <div class="btn-group" data-toggle="buttons">
                    <label class={"radio"}>
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_post"
                            name={`item-${item.id}`}
                            checked={can_post}
                            onclick={e => changePermission("can_post")}
                        />Can Post
                    </label>
                    <label class={"radio"}>
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_read"
                            name={`item-${item.id}`}
                            checked={can_read}
                            onclick={e => changePermission("can_read")}
                        />Can Read
                    </label>
                </div>
            </td>
            <td style={style}>
                <a
                    href="#"
                    class="remove-user"
                    onclick={e => {
                        actions.removeUserFromGroup({ index, group_id });
                    }}
                >
                    {remove}
                </a>
            </td>
        </tr>
    );
};
export default Users;
