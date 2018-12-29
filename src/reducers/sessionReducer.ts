import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";

export type State = {
  readonly query: string;
  readonly isShowingHiddenBookmark: boolean;
  readonly isRetrievingBookmarks: boolean;
  readonly areBookmarksReady: boolean;
};

export const initialState: State = {
  query: "",
  isShowingHiddenBookmark: false,
  isRetrievingBookmarks: false,
  areBookmarksReady: false
};

export const sessionReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.retrieveBookmarks): {
        draft.isRetrievingBookmarks = true;
        break;
      }
      case getType(actions.retrieveBookmarksSuccess): {
        draft.isRetrievingBookmarks = false;
        draft.areBookmarksReady = true;
        break;
      }
      case getType(actions.rehydrateSuccess): {
        if (action.payload.bookmarks) {
          draft.areBookmarksReady = true;
        }
        break;
      }
      case getType(actions.toggleShowHiddenBookmark): {
        draft.isShowingHiddenBookmark = !state.isShowingHiddenBookmark;
        break;
      }
      case getType(actions.setQuery): {
        draft.query = action.payload;
        break;
      }
      default:
        return state;
    }
  });
};
