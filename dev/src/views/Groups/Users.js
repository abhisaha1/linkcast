import { h } from "hyperapp";
import { Radio } from "../Common/Radio";

const Users = ({ actions, item, isAdmin }) => {
    var remove = isAdmin ? "" : "remove";
    let can_post = item.group_rights == "can_post";
    let can_read = item.group_rights == "can_read";

    return (
        <tr class="user-item" data-id="{USER_ID}">
            <td>{item.nickname}</td>
            <td>
                <div class="btn-group" data-toggle="buttons">
                    <label
                        class={
                            "btn btn-default btn-xs " + (can_post && "active")
                        }
                    >
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_post"
                            name="optradio"
                            checked={can_post}
                        />Can Post
                    </label>
                    <label
                        class={
                            "btn btn-default btn-xs " + (can_read && "active")
                        }
                    >
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_read"
                            name="optradio"
                            checked={can_read}
                        />Can Read
                    </label>
                </div>
            </td>
            <td>
                <a href="#" class="remove-user">
                    {remove}
                </a>
            </td>
        </tr>
    );
};
export default Users;
