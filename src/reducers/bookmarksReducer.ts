import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";
import { ChromeBookmark } from "../types/ChromeBookmark";

export type State = {
  readonly foldersById: { [id: string]: ChromeBookmark };
  readonly bookmarksById: { [id: string]: ChromeBookmark };
  readonly isRetrievingBookmarks: boolean;
  readonly areBookmarksReady: boolean;
};

export const initialState: State = {
  foldersById: {},
  bookmarksById: {},
  isRetrievingBookmarks: false,
  areBookmarksReady: false
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
        draft.foldersById = action.payload.foldersById;
        draft.bookmarksById = action.payload.bookmarksById;
        draft.isRetrievingBookmarks = false;
        draft.areBookmarksReady = true;
        break;
      }
      default:
        return state;
    }
  });
};
