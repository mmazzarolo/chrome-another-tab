import { all, put, takeEvery } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { getBookmarks } from "./../services/chromeService";
import { parseBookmarkTree } from "../utils/parseBookmarkTree";

export const retrieveBookmarksSaga = function*() {
  const chromeBookmarks = yield getBookmarks();
  const parsedBookmarks = parseBookmarkTree(chromeBookmarks);
  yield put(actions.retrieveBookmarksSuccess(parsedBookmarks));
};

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.retrieveBookmarks), retrieveBookmarksSaga)
  ]);
};
