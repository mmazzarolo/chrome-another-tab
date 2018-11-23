import { delay } from "../utils/delay";
import bookmarksFixture from "../fixtures/bookmarks.json";

export const getBookmarks = async (query?: string) => {
  if (process.env.NODE_ENV === "development") {
    await delay(100);
    return bookmarksFixture;
  } else {
    return new Promise<chrome.bookmarks.BookmarkTreeNode[]>(resolve =>
      query
        ? chrome.bookmarks.search(query, resolve)
        : chrome.bookmarks.getTree(resolve)
    );
  }
};

export const openNewTab = (params: { url: string }) =>
  new Promise<chrome.tabs.Tab>(resolve => chrome.tabs.create(params, resolve));
