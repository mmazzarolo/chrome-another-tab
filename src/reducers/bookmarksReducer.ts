import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";
import { ChromeBookmark } from "../types/ChromeBookmark";

export type State = {
  readonly bookmarks: ChromeBookmark[];
  readonly isRetrievingBookmarks: boolean;
};

export const initialState: State = {
  bookmarks: [],
  isRetrievingBookmarks: false
};

export const bookmarksReducer = (
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
        draft.bookmarks = action.payload;
        break;
      }
      default:
        return state;
    }
  });
};
