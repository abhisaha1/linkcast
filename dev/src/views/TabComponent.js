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
    return (
        <div>
            <ul class={`nav ${type} ${classes}`}>
                {Object.keys(state[stateKey].tabs).map(tab_id => {
                    let tab = state[stateKey].tabs[tab_id];
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
                class={"tab-content " + classes + " " + state[stateKey].active}
            >
                <div class="tab-pane fade active in">{html}</div>
            </div>
        </div>
    );
};
