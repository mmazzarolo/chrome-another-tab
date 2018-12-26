import { ChromeBookmark } from "./ChromeBookmark";

export type ReduxPersistedState = {
  foldersById: { [id: string]: ChromeBookmark };
  bookmarksById: { [id: string]: ChromeBookmark };
  hiddenBookmarkIds: string[];
};
