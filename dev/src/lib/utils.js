export const trigger = (selected, name) => {
    var evObj = document.createEvent("HTMLEvents");
    evObj.initEvent(name, true, true);
    var elem = document.querySelector(selected);
    elem.dispatchEvent(evObj);
};
