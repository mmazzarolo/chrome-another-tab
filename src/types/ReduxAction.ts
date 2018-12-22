import { ActionType, getType } from "typesafe-actions";

import { actions } from "../actions";

export type ReduxAction = ActionType<typeof actions>;
