import { put } from "redux-saga/effects";
import { actions } from "../actions/index";
import { getBookmarks } from "../services/chromeService";
import { parseChromeBookmarks } from "../utils/parseChromeBookmarks";

export const retrieveBookmarksSaga = function*() {
  const chromeBookmarks = yield getBookmarks();
  const parsedBookmarks = parseChromeBookmarks(chromeBookmarks);
  yield put(
    actions.retrieveBookmarksSuccess(
      parsedBookmarks.foldersById,
      parsedBookmarks.bookmarksById
    )
  );
};
