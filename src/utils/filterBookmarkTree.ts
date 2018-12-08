import { compact } from "lodash";

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode;

export const filterBookmarkTree = (
  bookmarkTree: BookmarkTreeNode[],
  query: string
) => {
  const filterQuery = (node: BookmarkTreeNode): BookmarkTreeNode => {
    if (!node.children) {
      const newNode = node.title.toLowerCase().includes(query.toLowerCase())
        ? node
        : undefined;
      return newNode as BookmarkTreeNode;
    }
    return {
      ...node,
      children: compact<BookmarkTreeNode>(node.children.map(filterQuery))
    };
  };
  return bookmarkTree.map(filterQuery);
};
