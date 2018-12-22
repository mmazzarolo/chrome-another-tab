import { createStandardAction } from "typesafe-actions";
import { ChromeBookmark } from "./../types/ChromeBookmark";
import { ReduxPersistedState } from "./../types/ReduxPersistedState";

export const actions = {
  // App actions
  toggleShowHiddenBookmark: createStandardAction(
    "app/TOGGLE_SHOW_HIDDEN_BOOKMARK"
  )(),
  rehydrate: createStandardAction("app/REHYDRATE_REQUEST")(),
  rehydrateSuccess: createStandardAction("app/REHYDRATE_SUCCESS")<
    ReduxPersistedState
  >(),

  // Bookmark actions
  retrieveBookmarks: createStandardAction("bookmark/RETRIEVE_BOOKMARK")(),
  retrieveBookmarksSuccess: createStandardAction(
    "bookmark/RETRIEVE_BOOKMARK_SUCCESS"
  )<ChromeBookmark[]>(),

  // Settings actions
  hideBookmark: createStandardAction("settings/HIDE_BOOKMARK")<string>(),
  showBookmark: createStandardAction("settings/SHOW_BOOKMARK")<string>()
};
