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
                    <p>Enter your email address to recover your password</p>
                    <div class="form-group">
                        <label class="control-label col-sm-3" for="email">
                            Email
                        </label>
                        <div class="col-sm-9">
                            <input
                                class="form-control"
                                onblur={e => onBlur(e, "email")}
                                type="text"
                                placeholder="Enter your email.."
                            />
                        </div>
                        <div class="col-sm-9 col-sm-offset-3">
                            <br />
                            <button
                                type="submit"
                                class="login-btn btn btn-default btn-xs"
                                onclick={() =>
                                    actions.sendRecoveryEmail(localState)}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalHoc(ForgotPasswordModal);
