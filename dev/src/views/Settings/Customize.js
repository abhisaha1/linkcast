import { h } from "hyperapp";
import { Radio } from "../Common/Radio";

const Customize = ({ state, actions }) => {
    const itemClicked = (e, key) => {
        actions.saveCustomization({ e, key });
    };
    let initialState = state.user.customize;
    return (
        <div>
            <div class=" form-horizontal">
                <div class="form-group" id="sound-setting">
                    <label class="control-label col-sm-3">Sound</label>
                    <div class="col-sm-9">
                        <div class="btn-group" data-toggle="buttons">
                            <label
                                data-val="1"
                                class={
                                    "btn btn-default btn-sm " +
                                    (initialState.sound && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="1"
                                    name="sound"
                                    onclick={e => itemClicked(e, "sound")}
                                    checked={initialState.sound}
                                />
                                On
                            </label>
                            <label
                                data-val="0"
                                class={
                                    "btn btn-default btn-sm " +
                                    (!initialState.sound && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="0"
                                    name="sound"
                                    onclick={e => itemClicked(e, "sound")}
                                    checked={!initialState.sound}
                                />Off
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="persist-setting">
                    <label class="control-label col-sm-3">Allow offline</label>
                    <div class="col-sm-9">
                        <div class="btn-group" data-toggle="buttons">
                            <label
                                data-val="1"
                                class={
                                    "btn btn-default btn-sm " +
                                    (initialState.offline && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="1"
                                    name="offline"
                                    onclick={e => itemClicked(e, "offline")}
                                    checked={initialState.offline}
                                />
                                On
                            </label>
                            <label
                                data-val="0"
                                class={
                                    "btn btn-default btn-sm " +
                                    (!initialState.offline && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="0"
                                    name="offline"
                                    onclick={e => itemClicked(e, "offline")}
                                    checked={!initialState.offline}
                                />Off
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="rich-notification">
                    <label class="control-label col-sm-3">Notification:</label>
                    <div class="col-sm-9">
                        <div class="btn-group" data-toggle="buttons">
                            <label
                                data-val="1"
                                class={
                                    "btn btn-default btn-sm " +
                                    (initialState.notification && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="1"
                                    name="noti"
                                    onclick={e =>
                                        itemClicked(e, "notification")}
                                    checked={initialState.notification}
                                />On
                            </label>
                            <label
                                data-val="0"
                                class={
                                    "btn btn-default btn-sm " +
                                    (!initialState.notification && "active")
                                }
                            >
                                <Radio
                                    class="radio"
                                    type="radio"
                                    value="0"
                                    name="noti"
                                    onclick={e =>
                                        itemClicked(e, "notification")}
                                    checked={!initialState.notification}
                                />Off
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="theme-setting">
                    <label class="control-label col-sm-3">Theme:</label>
                    <div class="col-sm-9">
                        <div class="btn-group" data-toggle="buttons">
                            <label
                                data-val="1"
                                class="btn btn-default btn-sm active"
                            >
                                <input
                                    class="radio"
                                    type="radio"
                                    value="1"
                                    name="noti"
                                />Dark
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customize;
