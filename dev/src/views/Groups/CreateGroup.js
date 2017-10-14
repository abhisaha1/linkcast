import { h } from "hyperapp";
import { Radio } from "../Common/Radio";

let password = null;
const CreateGroup = props => {
    let localState = { mode: "create" };
    const onBlur = (e, key) => {
        localState[key] = e.target.value;
        if (key == "is_public") {
            password.closest("#group-private").classList.remove("hide");
            if (e.target.value == "1") {
                password.closest("#group-private").classList.add("hide");
            }
        }
    };
    const createGroup = () => {
        let data = localState;
        if (
            data.is_public == "0" &&
            (!data.group_password || data.group_password.length == 0)
        ) {
            alert("Password is mandatory");
            return;
        }
        saveEditedGroup(data);
    };
    return (
        <div>
            <p>
                You can create a public group which is visible to all users. Any
                body will be able to join and see the links being shared. For
                privacy, you can create a private group.
            </p>
            <div>
                <div class=" form-horizontal" id="create-group-block">
                    <div class="form-group">
                        <label
                            class="control-label col-sm-3 required"
                            for="inputGroupCreate"
                        >
                            Name
                        </label>
                        <div class="col-sm-9">
                            <input
                                size="30"
                                class="form-control"
                                id="inputGroupCreate"
                                type="text"
                                placeholder="Enter a group name"
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
                                id="inputGrpDesc"
                                type="text"
                                placeholder="Enter a group description"
                            />
                        </div>
                    </div>

                    <div class="form-group" id="group-visibility">
                        <label
                            class="control-label col-sm-3"
                            for="inputDefault"
                        >
                            Visibility
                        </label>
                        <div class="col-sm-9">
                            <label class="radio-inline">
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="1"
                                    name="group-visibility"
                                    checked="true"
                                    onclick={e => onBlur(e, "is_public")}
                                />Public
                            </label>
                            <label class="radio-inline">
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="0"
                                    name="group-visibility"
                                    onclick={e => onBlur(e, "is_public")}
                                />Private
                            </label>
                        </div>
                    </div>
                    <div id="group-private" class="hide">
                        <div class="form-group">
                            <label
                                class="control-label col-sm-3"
                                for="group-password"
                            >
                                Password:
                            </label>
                            <div class="col-sm-9">
                                <input
                                    type="password"
                                    id="group-password"
                                    class="form-control group-private"
                                    onblur={e => onBlur(e, "group_password")}
                                    oncreate={e => {
                                        password = e;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="group-rights">
                        <label class="control-label col-sm-3">
                            Permissions:
                        </label>
                        <div class="col-sm-9">
                            <label class={"radio-inline"}>
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="can_post"
                                    name="group_rights"
                                    checked="true"
                                    onclick={e => onBlur(e, "group_rights")}
                                />Can Post
                            </label>
                            <label class={"radio-inline"}>
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="can_read"
                                    name="group_rights"
                                    checked="false"
                                    onclick={e => onBlur(e, "group_rights")}
                                />Can Read
                            </label>
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9">
                        <br />
                        <button
                            type="submit"
                            data-action="create"
                            id="create-group"
                            class="actionBtn btn btn-default btn-sm"
                            onclick={createGroup}
                        >
                            Create Group
                        </button>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
};

export default CreateGroup;
