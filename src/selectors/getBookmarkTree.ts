import { compareIndexes } from "./../utils/compareIndexes";
import { BookmarkTree } from "./../types/BookmarkTree";
import { ReduxState } from "../types/ReduxState";
import { getIsFolderHidden } from "./getIsFolderHidden";

// Given the Redux state returns a "BookmarkTree" object with data that can
// be easily represented using React components.
export const getBookmarkTree = (state: ReduxState): BookmarkTree => {
  const { foldersById, bookmarksById } = state.bookmarks;
  const { query, isShowingHiddenBookmarks } = state.session;
  // Get an array of bookmark folders (sorted like in the Chrome bookmarks)
  const folders: BookmarkTree = Object.keys(foldersById)
    .map(folderId => ({
      ...foldersById[folderId],
      isHidden: getIsFolderHidden(state, folderId),
      bookmarks: []
    }))
    .filter(x => isShowingHiddenBookmarks || !x.isHidden)
    .sort(compareIndexes);
  // Populate the folders with their bookmarks
  Object.keys(bookmarksById).forEach(bookmarkId => {
    const bookmark = bookmarksById[bookmarkId];
    const isTitleInQuery = bookmark.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const isUrlInQuery = (bookmark.url || "")
      .toLowerCase()
      .includes(query.toLowerCase());
    const isVisible = isTitleInQuery || isUrlInQuery;
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
  // Remove the empty folders
  const bookmarkTree = folders.filter(folder => {
    return folder.bookmarks && folder.bookmarks.length > 0;
  });
  // Sort the folders bookmarks (like in the Chrome bookmarks)
  bookmarkTree.forEach(folder => {
    folder.bookmarks.sort(compareIndexes);
  });
  return bookmarkTree;
};
