import { h } from "hyperapp";
import { Radio } from "../Common/Radio";

let localState = {
    name: "",
    desc: "",
    mode: "create",
    group_rights: "can_post",
    is_public: 1
};
const CreateGroup = props => {
    const onBlur = (e, key) => {
        localState[key] = e.target.value;
    };
    const createGroup = () => {
        props.actions.createNewGroup(localState);
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
                                onblur={e => onBlur(e, "name")}
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
                                onblur={e => onBlur(e, "desc")}
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
