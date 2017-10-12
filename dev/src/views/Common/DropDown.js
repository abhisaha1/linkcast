import { h } from "hyperapp";

const DropDown = ({ data, selected, onChange, classes = "", identifier }) => {
    const options = data.map(item => {
        if (selected == item.group_id) {
            return (
                <option selected="selected" value={item[identifier]}>
                    {item.name}
                </option>
            );
        }
        return <option value={item[identifier]}>{item.name}</option>;
    });

    return (
        <select class={classes} onchange={onChange}>
            {options}
        </select>
    );
};

export default DropDown;
