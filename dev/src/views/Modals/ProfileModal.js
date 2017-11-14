import { h } from "hyperapp";
import Links from "../Links/Links";
import ModalHoc from "../Common/ModalHoc";

const P = ({ state, actions, onScroll, loadMore }) => {
    let groups = <p class="profile-group">Loading..</p>;
    if (!state.modals.profile.links.isFetching) {
        groups = state.modals.profile.user.groups.map(group => {
            return <span class="profile-group">{group.name}</span>;
        });
    }

    return (
        <div model="modals.profile.links" class="row">
            <div class="col-sm-3">
                <div class="user-groups-list">
                    <h5 class="group-title">Groups</h5>
                    <div class="groups-wrapper">{groups}</div>
                </div>
            </div>
            <div class="col-sm-9">
                <Links
                    model="modals.profile.links"
                    tab={state.modals.profile.links}
                    onScroll={actions.onScroll}
                    state={state}
                    loadMore={e =>
                        actions.getUserLinks({
                            e,
                            user_id: state.modals.profile.user.id
                        })}
                    actions={actions}
                />
            </div>
        </div>
    );
};

export default ModalHoc(P);
