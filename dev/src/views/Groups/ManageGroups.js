import { h } from "hyperapp";
import Users from "./Users";
import DropDown from "../Common/DropDown";
import { Radio } from "../Common/Radio";
const ManageGroups = ({ state, actions }) => {
    const GroupUsers = state.groupUsers.data.map(item => {
        return (
            <Users item={item} isAdmin={item.id == state.groupUsers.admin_id} />
        );
    });
    let groups = [];

    state.allGroups.data.map(item => {
        if (item.admin == state.user.data.id) {
            groups.push(item);
        }
    });
    let selected = groups[0] ? groups[0].id : 0;
    return (
        <div class="tab-pane" id="tab-manage-groups">
            <p>
                You can manage the groups for which are you are the admin.
                <button
                    class="invite-btn btn btn-xs btn-success pull-right"
                    onclick={e =>
                        actions.showInviteModal({
                            e,
                            group_id: state.groupUsers.group_id
                        })}
                >
                    Invite
                </button>
            </p>

            <div class="row">
                <div class="col-sm-6 form-horizontal">
                    <div
                        class="form-group"
                        oncreate={() => {
                            var evObj = document.createEvent("HTMLEvents");
                            evObj.initEvent("change", true, true);
                            var elem = document.querySelector(".manage-gdd");
                            elem.dispatchEvent(evObj);
                        }}
                    >
                        <label class="control-label col-sm-3">Groups:</label>
                        <div class="col-sm-9">
                            <DropDown
                                classes="form-control manage-gdd"
                                identifier="id"
                                data={groups}
                                selected={selected}
                                onChange={actions.fetchGroupUsers}
                            />
                        </div>
                    </div>
                    <GroupEditForm state={state} />
                </div>
                <div class="col-sm-6 form-group scroll" id="group-users-block">
                    <label>Group Users:</label>
                    <table class="table table-hover" id="group-users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Access</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>{GroupUsers}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const GroupEditForm = ({ state }) => {
    let selectedGroup = {};
    state.allGroups.data.map(group => {
        if (state.groupUsers.group_id == group.id) selectedGroup = group;
    });
    let can_post = selectedGroup.group_rights == "can_post";
    let can_read = selectedGroup.group_rights == "can_read";
    return (
        <div class="editgroup-block">
            <div class="form-group">
                <label
                    class="control-label col-sm-3 required"
                    for="inputGroupCreate"
                >
                    Name
                </label>
                <div class="col-sm-9">
                    <input
                        class="form-control"
                        value={selectedGroup.name}
                        type="text"
                    />
                </div>
            </div>
            <div class="form-group">
                <label
                    class="control-label col-sm-3 required"
                    for="inputGrpDesc"
                >
                    Desc
                </label>
                <div class="col-sm-9">
                    <input
                        size="140"
                        class="form-control"
                        value={selectedGroup.desc}
                        type="text"
                    />
                </div>
            </div>

            <div class="form-group" id="group-visibility">
                <label class="control-label col-sm-3" for="inputDefault">
                    Visibility
                </label>
                <div class="col-sm-9">
                    <label class="radio-inline">
                        <Radio
                            class="radio"
                            type="radio"
                            value="1"
                            name="group-visibility"
                            checked={selectedGroup.is_public == "1"}
                        />Public
                    </label>
                    <label class="radio-inline">
                        <Radio
                            class="radio"
                            type="radio"
                            value="0"
                            name="group-visibility"
                            checked={selectedGroup.is_public == "0"}
                        />Private
                    </label>
                </div>
            </div>
            <div id="group-private" class="hide">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="group-password">
                        Password:
                    </label>
                    <div class="col-sm-9">
                        <input
                            type="password"
                            id="group-password"
                            class="form-control group-private"
                        />
                    </div>
                </div>
            </div>
            <div class="form-group" id="group-rights">
                <label class="control-label col-sm-3">Permissions:</label>
                <div class="col-sm-9">
                    <div class="btn-group" data-toggle="buttons">
                        <label
                            class={
                                "btn btn-default btn-sm " +
                                (can_post && "active")
                            }
                        >
                            <Radio
                                class="radio"
                                type="radio"
                                value="can_post"
                                name="optradio"
                                checked={
                                    selectedGroup.group_rights == "can_post"
                                }
                            />Can Post
                        </label>
                        <label
                            class={
                                "btn btn-default btn-sm " +
                                (can_read && "active")
                            }
                        >
                            <Radio
                                class="radio"
                                type="radio"
                                value="can_read"
                                name="optradio"
                                checked={
                                    selectedGroup.group_rights == "can_post"
                                }
                            />Can Read
                        </label>
                    </div>
                </div>
            </div>

            <div class="col-xs-offset-3 col-xs-9">
                <button
                    data-action="edit"
                    type="submit"
                    id="edit-group-save-btn"
                    class="btn btn-default btn-sm"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ManageGroups;
