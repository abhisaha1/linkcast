import { app } from "hyperapp";
import actions from "./actions";
import state from "./state";
import view from "./views/Main";
import logger from "@hyperapp/logger";

const options = {
    state,
    actions,
    view
};
if (process.env.NODE_ENV == "dev") {
    logger()(app)(options);
    //app(options);
} else {
    app(options);
}
