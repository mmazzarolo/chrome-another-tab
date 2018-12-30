import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";

export type State = {};

export const initialState: State = {};

export const settingsReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.rehydrateSuccess): {
        const persistedState = action.payload;
        if (persistedState.settings) {
          return persistedState.settings;
        }
        break;
      }
      default:
        return state;
    }
  });
};
