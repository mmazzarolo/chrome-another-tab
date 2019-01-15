import { BookmarkTree } from "./../types/BookmarkTree";
import { ReduxState } from "../types/ReduxState";
import { getIsBookmarkHidden } from "./getIsBookmarkHidden";

export const getBookmarkTree = (state: ReduxState): BookmarkTree => {
  const { foldersById, bookmarksById } = state.bookmarks;
  const { query, isShowingHiddenBookmark } = state.session;
  const folders: BookmarkTree = Object.entries(foldersById)
    .sort(
      ([keyA, { nodeOrder: nodeOrderA }], [keyB, { nodeOrder: nodeOrderB }]) =>
        nodeOrderA! - nodeOrderB!
    )
    .map(([folderId]) => ({
      ...foldersById[folderId],
      bookmarks: []
    }));
  Object.keys(bookmarksById).forEach(bookmarkId => {
    const bookmark = bookmarksById[bookmarkId];
    const isHidden = getIsBookmarkHidden(state, bookmark.id);
    const isTitleQuery = bookmark.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const isUrlQuery = (bookmark.url || "")
      .toLowerCase()
      .includes(query.toLowerCase());
    const isVisible =
      (!isHidden || isShowingHiddenBookmark) && (isTitleQuery || isUrlQuery);
    if (isVisible) {
      const folderIndex = folders.findIndex(
        folder => folder.id === bookmark.parentId
      );
      if (folderIndex > -1) {
        if (folders[folderIndex].bookmarks) {
          folders[folderIndex].bookmarks.push(bookmark);
        } else {
          folders[folderIndex].bookmarks = [bookmark];
        }
      }
    }
  });
  const bookmarkTree = folders.filter(folder => {
    return folder.bookmarks && folder.bookmarks.length > 0;
  });
  return bookmarkTree;
};
