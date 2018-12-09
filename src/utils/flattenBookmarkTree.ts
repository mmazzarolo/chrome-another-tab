import { omit } from "lodash";

export const flattenBookmarkTree = (
  bookmarkTree: chrome.bookmarks.BookmarkTreeNode[]
) => {
  const flattenedBookmarksTree: chrome.bookmarks.BookmarkTreeNode[] = [];
  const flattenBookmarkNodes = (nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
    nodes.forEach(node => {
      if (node.children) {
        flattenedBookmarksTree.push({
          ...node,
          children: node.children
            .filter(child => {
              return !!child.url && child.url !== "chrome://bookmarks/";
            })
            .map(child => {
              return omit(child, "children");
            })
        });
        flattenBookmarkNodes(node.children);
      }
    });
  };
  flattenBookmarkNodes(bookmarkTree);
  return flattenedBookmarksTree;
};
