import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";
import { ChromeBookmark } from "../types/ChromeBookmark";

export type State = {
  readonly foldersById: { [id: string]: ChromeBookmark };
  readonly bookmarksById: { [id: string]: ChromeBookmark };
};

export const initialState: State = {
  foldersById: {},
  bookmarksById: {}
};

export const bookmarksReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.retrieveBookmarksSuccess): {
        draft.foldersById = action.payload.foldersById;
        draft.bookmarksById = action.payload.bookmarksById;
        break;
      }
      case getType(actions.rehydrateSuccess): {
        const persistedState = action.payload;
        if (persistedState.bookmarks) {
          return persistedState.bookmarks;
        }
        break;
      }
      default:
        return state;
    }
  });
};
