import { all, put, takeEvery } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { retrieveBookmarksSaga } from "./retrieveBookmarksSaga";
import { rehydrateSaga } from "./rehydrateSaga";
import { persistSaga } from "./persistSaga";

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.retrieveBookmarks), retrieveBookmarksSaga),
    takeEvery(getType(actions.rehydrate), rehydrateSaga),
    takeEvery(
      [
        getType(actions.showBookmark),
        getType(actions.hideBookmark),
        getType(actions.showFolder),
        getType(actions.hideFolder),
        getType(actions.retrieveBookmarksSuccess)
      ],
      persistSaga
    )
  ]);
};
