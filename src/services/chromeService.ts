import { Bookmark } from "./../types/Bookmark";
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

export const moveBookmark = async (
  bookmark: Bookmark,
  oldIndex: number,
  newIndex: number
) => {
  if (NODE_ENV !== "development") {
    return new Promise<ChromeBookmark>(resolve => {
      let fixedNewIndex = newIndex;
      if (oldIndex < newIndex) {
        fixedNewIndex++;
      }
      chrome.bookmarks.move(
        bookmark.id,
        { index: fixedNewIndex, parentId: bookmark.parentId },
        resolve
      );
    });
  }
};
