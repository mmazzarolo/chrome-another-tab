import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "./getIsBookmarkHidden";

export const getFilteredBookmarks = (state: ReduxState) => {
  const { bookmarks } = state.bookmarks;
  const { query, isShowingHiddenBookmark } = state.session;
  if (isShowingHiddenBookmark && !query) {
    return bookmarks;
  }
  return bookmarks
    .map(folder => {
      return {
        ...folder,
        children:
          folder.children &&
          folder.children.filter(bookmark => {
            const isHidden = getIsBookmarkHidden(state, bookmark.id);
            const isTitleQuery = bookmark.title
              .toLowerCase()
              .includes(query.toLowerCase());
            const isUrlQuery = (bookmark.url || "")
              .toLowerCase()
              .includes(query.toLowerCase());
            return !isHidden && (isTitleQuery || isUrlQuery);
          })
      };
    })
    .filter(folder => folder.children && folder.children.length > 0);
};
