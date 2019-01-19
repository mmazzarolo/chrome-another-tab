import { put } from "redux-saga/effects";
import { actions } from "../actions/index";
import { getBookmarks } from "../services/chromeService";
import { parseBookmarkTree } from "../utils/parseBookmarkTree";

export const retrieveBookmarksSaga = function*() {
  const chromeBookmarks = yield getBookmarks();
  const parsedBookmarks = parseBookmarkTree(chromeBookmarks);
  yield put(
    actions.retrieveBookmarksSuccess(
      parsedBookmarks.foldersById,
      parsedBookmarks.bookmarksById
    )
  );
};
