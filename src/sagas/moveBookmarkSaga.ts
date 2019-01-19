import { ActionType } from "typesafe-actions";
import { put, select } from "redux-saga/effects";
import { moveBookmark } from "./../services/chromeService";
import { actions } from "../actions/index";

export const moveBookmarkSaga = function*(
  action: ActionType<typeof actions.moveBookmark>
) {
  const { bookmark, oldIndex, newIndex } = action.payload;
  yield moveBookmark(bookmark, oldIndex, newIndex);
  yield put(actions.moveBookmarkSuccess());
};
