import { ChromeBookmark } from "./../types/ChromeBookmark";

type ChromeBookmarksById = { [id: string]: ChromeBookmark };

const withoutChildren = (bookmark: ChromeBookmark) => ({
  index: bookmark.index,
  title: bookmark.title,
  url: bookmark.url,
  dateGroupModified: bookmark.dateGroupModified,
  id: bookmark.id,
  parentId: bookmark.parentId,
  unmodifiable: bookmark.unmodifiable
});

export const parseChromeBookmarks = (chromeBookmarks: ChromeBookmark[]) => {
  const foldersById: ChromeBookmarksById = {};
  const allFolderIds: string[] = [];
  const bookmarksById: ChromeBookmarksById = {};
  const allBookmarkIds: string[] = [];
  const parseBookmarkNodes = (nodes: ChromeBookmark[]) => {
    nodes.forEach(node => {
      if (node.children) {
        foldersById[node.id] = withoutChildren(node);
        allFolderIds.push(node.id);
        parseBookmarkNodes(node.children);
      } else {
        allBookmarkIds.push(node.id);
        bookmarksById[node.id] = node;
      }
    });
  };
  parseBookmarkNodes(chromeBookmarks);

  return { foldersById, bookmarksById };
};
