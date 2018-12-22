import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";

export type State = {
  readonly isShowingHiddenBookmark: boolean;
};

export const initialState: State = {
  isShowingHiddenBookmark: false
};

export const appReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.toggleShowHiddenBookmark): {
        draft.isShowingHiddenBookmark = !state.isShowingHiddenBookmark;
        break;
      }
      default:
        return state;
    }
  });
};
