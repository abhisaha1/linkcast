import { h } from "hyperapp";
import Links from "../Links/Links";
import ModalHoc from "../Common/ModalHoc";

let localState = {};
const ForgotPasswordModal = ({ state, actions }) => {
    const onBlur = (e, key) => {
        localState[key] = e.target.value.trim();
    };
    return (
        <div model="modals.profile.links" class="row">
            <div class=" form-horizontal">
                <div class="col-xs-12">
                    <p>Edit your comment</p>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <input
                                class="form-control"
                                type="text"
                                value={state.modals.comment.data.comment}
                            />
                        </div>
                        <div class="col-sm-9 col-sm-offset-3">
                            <br />
                            <button
                                type="submit"
                                class="login-btn btn btn-default btn-xs"
                                onclick={() =>
                                    actions.saveEditedComment(localState)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalHoc(ForgotPasswordModal);
