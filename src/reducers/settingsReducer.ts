import { produce } from "immer";
import { getType } from "typesafe-actions";
import { pull } from "lodash";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";

export type State = {
  readonly hiddenBookmarkIds: string[];
};

export const initialState: State = {
  hiddenBookmarkIds: []
};

export const settingsReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.hideBookmark): {
        const bookmarkId = action.payload;
        if (draft.hiddenBookmarkIds.indexOf(bookmarkId) === -1) {
          draft.hiddenBookmarkIds.push(bookmarkId);
        }
        break;
      }
      case getType(actions.showBookmark): {
        const bookmarkId = action.payload;
        if (draft.hiddenBookmarkIds.indexOf(bookmarkId) > -1) {
          pull(draft.hiddenBookmarkIds, bookmarkId);
        }
        break;
      }
      case getType(actions.rehydrateSuccess): {
        const persistedState = action.payload;
        draft.hiddenBookmarkIds = persistedState.hiddenBookmarkIds;
        break;
      }
      default:
        return state;
    }
  });
};
