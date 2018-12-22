import { omit } from "lodash";
import { ChromeBookmark } from "./../types/ChromeBookmark";

export const parseBookmarkTree = (bookmarkTree: ChromeBookmark[]) => {
  const parsedBookmarksTree: ChromeBookmark[] = [];
  const parseBookmarkNodes = (nodes: ChromeBookmark[]) => {
    nodes.forEach(node => {
      if (node.children) {
        const parsedBookmark = {
          ...node,
          children: node.children
            .filter(child => {
              const hasValidUrl = child.url !== "chrome://bookmarks/";
              const isEmptyFolder =
                child.children && child.children.length === 0;
              return !isEmptyFolder && hasValidUrl;
            })
            .map(child => {
              return omit(child, "children");
            })
        };
        if (!!parsedBookmark.title) {
          parsedBookmarksTree.push(parsedBookmark);
        }
        parseBookmarkNodes(node.children);
      }
    });
  };
  parseBookmarkNodes(bookmarkTree);
  return parsedBookmarksTree;
};
