import { h } from "hyperapp";

export const Radio = ({ type, classes, value, checked, name, onclick }) => {
    let props = {
        class: classes,
        type: type,
        value: value,
        name: name,
        onclick: onclick
    };
    if (checked) {
        props.checked = true;
    }
    return h("input", props);
};
