import { createStandardAction } from "typesafe-actions";
import { ChromeBookmark } from "./../types/ChromeBookmark";

export const actions = {
  // Bookmark actions
  retrieveBookmarks: createStandardAction("bookmark/RETRIEVE_BOOKMARK")(),
  retrieveBookmarksSuccess: createStandardAction(
    "bookmark/RETRIEVE_BOOKMARK_SUCCESS"
  )<ChromeBookmark[]>()
};
