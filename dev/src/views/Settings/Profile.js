import { h } from "hyperapp";
require("../../lib/color-picker");

const Profile = ({ state, actions }) => {
    return (
        <div>
            <Info
                actions={actions}
                state={state}
                loggedIn={state.user.loggedIn}
            />
            <LoginRegistration
                actions={actions}
                state={state}
                loggedIn={state.user.loggedIn}
            />
        </div>
    );
};

const Info = ({ state, actions, loggedIn }) => {
    if (!loggedIn) return null;

    let localState = {};

    const onBlur = (e, key) => {
        localState[key] = e.target.value;
    };
    return (
        state.user.loggedIn && (
            <div class={"authorized "}>
                <div class="status">
                    <div>
                        Connected as
                        <strong> {state.user.data.nickname}</strong>,{" "}
                        <a href="#" onclick={actions.doLogout}>
                            Logout
                        </a>
                    </div>
                </div>
                <div id="edit-profile">
                    <form
                        class="form-horizontal"
                        oncreate={e => {
                            let nicknameStyle = document.querySelector(
                                "#nickname"
                            ).style;
                            nicknameStyle.color = state.user.data.color;
                            ColorPicker(
                                document.getElementById("slide"),
                                document.getElementById("picker"),
                                function(hex, hsv, rgb) {
                                    nicknameStyle.color = hex;
                                    let e = {
                                        target: {
                                            value: hex
                                        }
                                    };
                                    onBlur(e, "color");
                                }
                            );
                        }}
                    >
                        <div class="form-group" style="line-height: 44px;">
                            <label
                                class="control-label col-sm-3"
                                for="profile-color"
                            >
                                Profile Color
                            </label>
                            <div class="col-sm-9" style={{ display: "flex" }}>
                                <div id="picker" />
                                <div id="slide" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label
                                class="control-label col-sm-3"
                                for="new-nickname"
                            >
                                Nickname
                            </label>
                            <div class="col-sm-9">
                                <input
                                    class="form-control"
                                    id="nickname"
                                    onblur={e => onBlur(e, "nickname")}
                                    type="text"
                                    value={state.user.data.nickname}
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="bio">
                                Short Bio
                            </label>
                            <div class="col-sm-9">
                                <input
                                    class="form-control"
                                    onblur={e => onBlur(e, "bio")}
                                    type="text"
                                    value={state.user.data.bio}
                                />
                            </div>
                        </div>
                        <div class="col-xs-offset-3 col-xs-12">
                            <button
                                type="submit"
                                style="margin-left: 14px;"
                                onclick={e =>
                                    actions.saveProfile({
                                        e,
                                        data: localState
                                    })}
                                class="profile-btn btn btn-default btn-sm"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};
let initialState = {
    nickname: "",
    password: "",
    email: ""
};
const LoginRegistration = ({ actions, state, loggedIn }) => {
    if (loggedIn) return null;

    const onBlur = (e, key) => {
        initialState[key] = e.target.value;
    };
    const handleLogin = () => {
        actions.doLogin(initialState);
    };
    const handleRegistration = (e, key) => {
        actions.doRegister(initialState);
    };

    return (
        <div class="step form-horizontal">
            <div class="col-xs-6">
                <p>Login</p>
                <br />
                <div class="form-group">
                    <label class="control-label col-sm-3" for="nickname">
                        Nickname
                    </label>
                    <div class="col-sm-9">
                        <input
                            class="form-control"
                            onblur={e => onBlur(e, "nickname")}
                            type="text"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label  col-sm-3" for="password">
                        Password
                    </label>
                    <div class="col-sm-9">
                        <input
                            class="form-control"
                            onblur={e => onBlur(e, "password")}
                            type="password"
                        />
                    </div>
                </div>
                <div class="col-sm-9 col-sm-offset-3">
                    <a href="#" onclick={actions.forgotPassword}>
                        Forgot Password
                    </a>
                </div>
                <div class="col-sm-9 col-sm-offset-3">
                    <br />
                    <button
                        type="submit"
                        class="login-btn btn btn-default btn-sm"
                        onclick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div class="col-xs-6">
                <p>Register</p>
                <br />
                <div class="form-group">
                    <label class="control-label col-sm-3" for="r-email">
                        Email
                    </label>
                    <div class="col-sm-9">
                        <input
                            onblur={e => onBlur(e, "email")}
                            class="form-control"
                            id="r-email"
                            type="email"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label  col-sm-3" for="r-nickname">
                        Nickname
                    </label>
                    <div class="col-sm-9">
                        <input
                            class="form-control"
                            id="r-nickname"
                            type="text"
                            onblur={e => onBlur(e, "nickname")}
                        />
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-3" for="r-password">
                        Password
                    </label>
                    <div class="col-sm-9">
                        <input
                            class="form-control"
                            id="r-password"
                            type="password"
                            onblur={e => onBlur(e, "password")}
                        />
                    </div>
                </div>
                <div class="col-sm-9 col-sm-offset-3">
                    <button
                        type="submit"
                        class="register-btn btn btn-default btn-sm"
                        onclick={handleRegistration}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Profile;
