import { h } from "hyperapp";
import ModalHoc from "../Common/ModalHoc";

const InviteModal = ({ state, actions, onScroll, loadMore }) => {
    return (
        <div model="modals.profile.invite" class="row">
            <div class="col-xs-6">
                <h6># Send Invites</h6>
                <input
                    type="text"
                    id="tags-input-send-invites"
                    class="form-control"
                    oncreate={e => {
                        e.focus();
                    }}
                />
            </div>
            <div class="col-xs-6">
                <h6># Edit Pending Invites</h6>
                <div id="sent-invites" class="scroll">
                    {state.modals.invite.data.invites.map((user, index) => {
                        return (
                            <div class="invite">
                                <span style={{ color: user.color }}>
                                    {user.nickname}
                                </span>
                                <span>
                                    <a
                                        class="withdraw-invite"
                                        href="#"
                                        onclick={e =>
                                            actions.withdrawInvite({
                                                e,
                                                index,
                                                invite_id: user.invite_id
                                            })}
                                    >
                                        Withdraw
                                    </a>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div class="col-xs-12">
                <div class="modal-footer">
                    <button
                        type="button"
                        onclick={actions.sendInvites}
                        class="btn btn-default btn-xs"
                    >
                        Send Invites
                    </button>
                    <button
                        type="button"
                        class="btn btn-default btn-xs"
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalHoc(InviteModal);
