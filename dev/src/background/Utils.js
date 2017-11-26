import templates from "./Templates";

export const checkStorage = () => {
    if (typeof localStorage.notification === "undefined") {
        localStorage.notification = 1;
    }
    if (typeof localStorage.sound === "undefined") {
        localStorage.sound = 1;
    }
    localStorage.theme = "dark";
};

export const getTitle = totalNotifications => {
    const getVerb = (count, word) => {
        return count > 1 ? word + "s" : word;
    };
    return `You have got ${totalNotifications} ${getVerb(
        totalNotifications,
        "notification"
    )}`;
};

export const getFormatedText = activity => {
    //activity type
    var type = activity.type;
    var template = templates[type];
    if (!template) {
        return "Couldn't decode the message. Maybe something very personal";
    }
    var text = template.replace(/{(.*?)}/gi, function(variable) {
        // convert {VAR} to VAR
        variable = variable.substring(1, variable.length - 1).toLowerCase();

        return activity[variable];
    });
    return text;
};

export const getEmoji = type => {
    switch (type) {
        case "like":
            return "❤️";
        case "link":
            return "🔗";
        case "comment":
            return "🗣";
        case "joined_linkcast":
            return "🙍🏻";
        case "joined_group":
            return "👨‍👨‍👦‍👦";
        case "group_invite":
            return "✉️";
        case "group_invite_rejected":
            return "😏";
        case "linkcast":
            return "📣";
        default:
            return "";
    }
};
