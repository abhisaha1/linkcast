import { h } from "hyperapp";

const ModalHoc = Component => props => {
    return (
        <div>
            <div
                class="modal fade in"
                tabindex="-1"
                role="dialog"
                style={{ display: "block" }}
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button
                                type="button"
                                class="close"
                                onclick={() =>
                                    props.actions.closeModal(props.name)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title" />
                        </div>
                        <div class="modal-body">
                            <p>
                                <Component {...props} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop" />
        </div>
    );
};

export default ModalHoc;
