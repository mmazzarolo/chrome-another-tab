import { every } from "lodash";
import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "./getIsBookmarkHidden";

export const getIsFolderHidden = (state: ReduxState, folderId: string) => {
  const { bookmarksById } = state.bookmarks;
  const folderBookmarks = Object.values(bookmarksById).filter(
    x => x.parentId === folderId
  );
  const isFolderHidden = every(folderBookmarks, x =>
    getIsBookmarkHidden(state, x.id)
  );
  return isFolderHidden;
};
