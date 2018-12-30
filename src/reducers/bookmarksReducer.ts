import { pull } from "lodash";
import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";
import { ChromeBookmark } from "../types/ChromeBookmark";

export type State = {
  readonly foldersById: { [id: string]: ChromeBookmark };
  readonly bookmarksById: { [id: string]: ChromeBookmark };
  readonly hiddenBookmarkIds: string[];
};

export const initialState: State = {
  foldersById: {},
  bookmarksById: {},
  hiddenBookmarkIds: []
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
      case getType(actions.hideFolder): {
        const folderId = action.payload;
        const folderBookmarks = Object.values(state.bookmarksById).filter(
          x => x.parentId === folderId
        );
        folderBookmarks.forEach(bookmark => {
          if (draft.hiddenBookmarkIds.indexOf(bookmark.id) === -1) {
            draft.hiddenBookmarkIds.push(bookmark.id);
          }
        });
        break;
      }
      case getType(actions.showFolder): {
        const folderId = action.payload;
        const folderBookmarks = Object.values(state.bookmarksById).filter(
          x => x.parentId === folderId
        );
        folderBookmarks.forEach(bookmark => {
          if (draft.hiddenBookmarkIds.indexOf(bookmark.id) > -1) {
            pull(draft.hiddenBookmarkIds, bookmark.id);
          }
        });
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
