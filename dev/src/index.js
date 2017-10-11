import { app } from "hyperapp";
import actions from "./actions";
import state from "./state";
import view from "./views/Main";
import events from "./events";
import logger from "@hyperapp/logger";
app({ state, events, actions, view, mixins: [logger()] });
