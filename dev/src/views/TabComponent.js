import { h } from "hyperapp";

export const TabComponent = ({
    type,
    state,
    stateKey,
    classes,
    onChange,
    html,
    onBeforeLabelSet
}) => {
    let active = state[stateKey].active;
    let isFetching = state[stateKey].tabs[active].isFetching;
    let isFetchingClass = isFetching ? " loading " : "";
    return (
        <div class="container-inner">
            <ul class={`nav ${type} ${classes}`}>
                {Object.keys(state[stateKey].tabs).map(tab_id => {
                    let tab = state[stateKey].tabs[tab_id];
                    if (tab.authorized && !localStorage.loggedIn) {
                        return false;
                    }
                    let active =
                        state[stateKey].active == tab_id ? "active" : "";
                    let label = tab.name;
                    if (typeof onBeforeLabelSet == "function") {
                        label = onBeforeLabelSet(label);
                    }
                    return (
                        <li class={active}>
                            <a
                                href="#"
                                onclick={e => onChange({ stateKey, tab_id })}
                            >
                                {label}
                            </a>
                            <span class="short-border" />
                        </li>
                    );
                })}
            </ul>
            <div
                class={`tab-content
                    ${classes}
                    ${state[stateKey].active}
                    ${isFetchingClass}`}
            >
                <div class="tab-pane fade active in">{html}</div>
            </div>
        </div>
    );
};
