import { delay } from "../utils/delay";
import bookmarksFixture from "../fixtures/bookmarks.json";

type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export const getBookmarks = async () => {
  if (process.env.NODE_ENV === "development") {
    await delay(100);
    return bookmarksFixture;
  } else {
    return new Promise<Bookmark[]>(chrome.bookmarks.getTree);
  }
};

export const openNewTab = (params: { url: string }) =>
  new Promise<chrome.tabs.Tab>(resolve => chrome.tabs.create(params, resolve));
