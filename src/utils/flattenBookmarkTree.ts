import { omit } from "lodash";

export const flattenBookmarkTree = (
  bookmarkTree: chrome.bookmarks.BookmarkTreeNode[]
) => {
  const flattenedBookmarksTree: chrome.bookmarks.BookmarkTreeNode[] = [];
  const flattenBookmarkNodes = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    nodes.forEach(node => {
      if (node.children) {
        const hasBookmarks = !!node.children.find(x => {
          return !x.children && x.url !== "chrome://bookmarks/";
        });
        if (hasBookmarks) {
          flattenedBookmarksTree.push({
            ...node,
            children: node.children.map(child => {
              return omit(child, "children");
            })
          });
        }
        flattenBookmarkNodes(node.children);
      }
    });
  };
  flattenBookmarkNodes(bookmarkTree);
  return flattenedBookmarksTree;
};
