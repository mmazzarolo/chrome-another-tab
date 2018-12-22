import { delay } from "../utils/delay";
import bookmarksFixture from "../fixtures/bookmarks.json";
import { ChromeBookmark } from "./../types/ChromeBookmark";

export const getBookmarks = async () => {
  if (process.env.NODE_ENV === "development") {
    await delay(100);
    return bookmarksFixture;
  } else {
    return new Promise<ChromeBookmark[]>(res => chrome.bookmarks.getTree(res));
  }
};

export const openNewTab = (params: { url: string }) =>
  new Promise<chrome.tabs.Tab>(resolve => chrome.tabs.create(params, resolve));
