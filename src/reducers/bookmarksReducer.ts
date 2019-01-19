import { pull } from "lodash";
import { produce } from "immer";
import { getType } from "typesafe-actions";
import { moveArrayElement } from "./../utils/moveArrayElement";
import { compareIndexes } from "./../utils/compareIndexes";
import { actions } from "../actions";
import { ReduxAction } from "../types/ReduxAction";
import { ChromeBookmark } from "../types/ChromeBookmark";

export type State = {
  readonly foldersById: { [id: string]: ChromeBookmark };
  readonly bookmarksById: { [id: string]: ChromeBookmark };
  readonly hiddenFolderIds: string[];
};

export const initialState: State = {
  foldersById: {},
  bookmarksById: {},
  hiddenFolderIds: []
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
      case getType(actions.hideFolder): {
        const folderId = action.payload;
        if (draft.hiddenFolderIds.indexOf(folderId) === -1) {
          draft.hiddenFolderIds.push(folderId);
        }
        break;
      }
      case getType(actions.showFolder): {
        const folderId = action.payload;
        if (draft.hiddenFolderIds.indexOf(folderId) > -1) {
          pull(draft.hiddenFolderIds, folderId);
        }
        break;
      }
      case getType(actions.moveBookmark): {
        const { parentId, oldIndex, newIndex } = action.payload;
        let bookmarks = Object.values(state.bookmarksById)
          .filter(x => x.parentId === parentId)
          .sort(compareIndexes);
        bookmarks = moveArrayElement(bookmarks, oldIndex, newIndex);
        bookmarks.forEach((x, index) => {
          draft.bookmarksById[x.id].index = index;
        });
        break;
      }
      case getType(actions.moveBookmarkSuccess): {
        return state;
      }
      case getType(actions.rehydrateSuccess): {
        const persistedState = action.payload;
        if (persistedState.bookmarks) {
          return {
            ...initialState,
            ...persistedState.bookmarks
          };
        }
        break;
      }
      default:
        return state;
    }
  });
};
