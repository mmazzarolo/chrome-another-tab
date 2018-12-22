import { StateType } from "typesafe-actions";
import { rootReducer } from "./../reducers";

export type ReduxState = StateType<typeof rootReducer>;
