import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "./getIsBookmarkHidden";

export const getFilteredBookmarks = (state: ReduxState) => {
  const { bookmarks } = state.bookmarks;
  const { isShowingHiddenBookmark } = state.app;
  if (isShowingHiddenBookmark) {
    return bookmarks;
  }
  return bookmarks.map(folder => {
    return {
      ...folder,
      children:
        folder.children &&
        folder.children.filter(bookmark => {
          const isHidden = getIsBookmarkHidden(state, bookmark.id);
          return !isHidden;
        })
    };
  });
};
