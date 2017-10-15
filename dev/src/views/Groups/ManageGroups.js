import { h } from "hyperapp";
import Users from "./Users";
import DropDown from "../Common/DropDown";
import { Radio } from "../Common/Radio";
const ManageGroups = ({ state, actions }) => {
    const GroupUsers = state.groupUsers.data.map((item, index) => {
        return (
            <Users
                actions={actions}
                index={index}
                group_id={state.groupUsers.group_id}
                item={item}
                isAdmin={item.id == state.groupUsers.admin_id}
            />
        );
    });
    let groups = [];

    state.allGroups.data.map(item => {
        if (item.admin == state.user.data.id) {
            groups.push(item);
        }
    });
    let selected = groups[0] ? groups[0].id : 0;

    if (groups.length == 0) return <p>You are not an admin of any group.</p>;
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
                    <GroupEditForm
                        saveEditedGroup={actions.saveEditedGroup}
                        state={state}
                    />
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
const GroupEditForm = ({ state, saveEditedGroup }) => {
    let selectedGroup = {};
    state.allGroups.data.map((group, i) => {
        if (state.groupUsers.group_id == group.id) {
            selectedGroup = group;
        }
    });

    let localState = { mode: "edit" };

    const onBlur = (e, key) => {
        localState[key] = e.target.value;
    };
    const saveGroup = () => {
        let data = Object.assign(selectedGroup, localState);
        saveEditedGroup(data);
    };

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
                        onblur={e => onBlur(e, "name")}
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
                        onblur={e => onBlur(e, "desc")}
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
                            onclick={e => onBlur(e, "is_public")}
                        />Public
                    </label>
                    <label class="radio-inline">
                        <Radio
                            class="radio"
                            type="radio"
                            value="0"
                            name="group-visibility"
                            checked={selectedGroup.is_public == "0"}
                            onclick={e => onBlur(e, "is_public")}
                        />Private
                    </label>
                </div>
            </div>

            <div class="form-group" id="group-rights">
                <label class="control-label col-sm-3">Permissions:</label>
                <div class="col-sm-9">
                    <label class={"radio-inline"}>
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_post"
                            name="group_rights"
                            checked={selectedGroup.group_rights == "can_post"}
                            onclick={e => onBlur(e, "group_rights")}
                        />Can Post
                    </label>
                    <label class={"radio-inline"}>
                        <Radio
                            class="radio"
                            type="radio"
                            value="can_read"
                            name="group_rights"
                            checked={selectedGroup.group_rights == "can_read"}
                            onclick={e => onBlur(e, "group_rights")}
                        />Can Read
                    </label>
                </div>
            </div>

            <div class="col-xs-offset-3 col-xs-9">
                <button
                    type="submit"
                    onclick={saveGroup}
                    class="btn btn-default btn-sm"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default ManageGroups;
