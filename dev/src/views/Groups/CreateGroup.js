import { h } from "hyperapp";
const CreateGroup = props => {
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
                                class="form-control"
                                id="inputGroupCreate"
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
                                id="inputGrpDesc"
                                type="text"
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
                                <input
                                    class="radio"
                                    checked
                                    type="radio"
                                    value="1"
                                    name="group-visibility"
                                />Public
                            </label>
                            <label class="radio-inline">
                                <input
                                    class="radio"
                                    type="radio"
                                    value="0"
                                    name="group-visibility"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-group" id="group-rights">
                        <label class="control-label col-sm-3">
                            Permissions:
                        </label>
                        <div class="col-sm-9">
                            <div class="btn-group" data-toggle="buttons">
                                <label class="btn btn-default btn-sm active">
                                    <input
                                        class="radio"
                                        type="radio"
                                        value="can_post"
                                        name="optradio"
                                    />Can Post
                                </label>
                                <label class="btn btn-default btn-sm">
                                    <input
                                        class="radio"
                                        type="radio"
                                        value="can_read"
                                        name="optradio"
                                    />Can Read
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9">
                        <br />
                        <button
                            type="submit"
                            data-action="create"
                            id="create-group"
                            class="actionBtn btn btn-default btn-sm"
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
