import { IS_LIVE_EXAMPLE } from "./../config/constants";
import { delay } from "../utils/delay";
import bookmarksFixture from "../fixtures/bookmarks.json";
import { ChromeBookmark } from "./../types/ChromeBookmark";
import { NODE_ENV } from "../config/constants";

export const getBookmarks = async () => {
  if (NODE_ENV === "development" || IS_LIVE_EXAMPLE) {
    await delay(100);
    return bookmarksFixture;
  } else {
    return new Promise<ChromeBookmark[]>(res => chrome.bookmarks.getTree(res));
  }
};

export const openNewTab = (params: { url: string }) =>
  new Promise<chrome.tabs.Tab>(resolve => chrome.tabs.create(params, resolve));
