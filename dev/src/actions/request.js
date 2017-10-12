import config from "../config.json";

const queryParams = params => {
    const esc = encodeURIComponent;
    return Object.keys(params)
        .map(k => esc(k) + "=" + esc(params[k]))
        .join("&");
};

export const request = (options = {}) => {
    let url = config.endpoint;
    options = Object.assign(
        {
            credentials: "same-origin",
            redirect: "error"
        },
        options
    );
    if (options.queryParams) {
        if (options.method == "POST") {
            options.headers = {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
            };

            options.body = getFormData(options.queryParams);
        } else {
            url +=
                (url.indexOf("?") === -1 ? "?" : "&") +
                queryParams(options.queryParams);
        }
        delete options.queryParams;
    }
    return fetch(url, options).then(data => data.json());
};

const getFormData = params => {
    return Object.keys(params)
        .map(key => {
            return (
                encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            );
        })
        .join("&");
};
