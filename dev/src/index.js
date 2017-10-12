import { app } from "hyperapp";
import actions from "./actions";
import state from "./state";
import view from "./views/Main";
import events from "./events";
import logger from "@hyperapp/logger";

const options = { state, events, actions, view };
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "dev") {
    options.mixins = [logger()];
}
app(options);
